import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ButtonComponent from '@/components/button/button.vue'

describe('ButtonComponent', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(ButtonComponent, {
      props,
      slots,
      attachTo: document.body,
    })
  }

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('Props', () => {
    it('renders with default props', () => {
      const wrapper = createWrapper()
      expect(wrapper.classes()).toContain('bg-primary-950')
    })

    it('renders label when provided', () => {
      const wrapper = createWrapper({ label: 'Test Button' })
      expect(wrapper.text()).toContain('Test Button')
    })

    it('applies full width class when fullWidth prop is true', () => {
      const wrapper = createWrapper({ fullWidth: true })
      expect(wrapper.classes()).toContain('w-full')
    })

    it('applies loading state correctly', () => {
      const wrapper = createWrapper({ loading: true })
      expect(wrapper.find('.spinner').exists()).toBe(true)
      expect(wrapper.attributes('disabled')).toBeDefined()
      expect(wrapper.classes()).toContain('cursor-wait')
    })

    it('applies custom classes when provided', () => {
      const wrapper = createWrapper({
        customClasses: 'test-custom-class',
        class: 'test-class',
      })
      expect(wrapper.classes()).toContain('test-custom-class')
      expect(wrapper.classes()).toContain('test-class')
    })
  })

  describe('Variants', () => {
    it.each([
      ['link', 'bg-transparent text-primary-700'],
      ['outline', 'bg-transparent text-surface-800'],
      ['solid', 'bg-primary-950 text-white'],
      ['secondary', 'bg-primary-50 text-primary-500'],
      ['ghost', 'hover:bg-accent'],
    ])('applies correct classes for %s variant', (variant, expectedClass) => {
      const wrapper = createWrapper({ variant })
      const classes = expectedClass.split(' ')
      classes.forEach((className) => {
        expect(wrapper.classes()).toContain(className)
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = createWrapper(
        {},
        {
          default: 'Default Content',
        },
      )
      expect(wrapper.text()).toContain('Default Content')
    })

    it('renders left icon slot when provided', () => {
      const wrapper = createWrapper(
        {},
        {
          left: '<span class="test-left-icon">←</span>',
        },
      )
      expect(wrapper.find('.icon-left').exists()).toBe(true)
    })

    it('renders right icon slot when provided', () => {
      const wrapper = createWrapper(
        {},
        {
          right: '<span class="test-right-icon">→</span>',
        },
      )
      expect(wrapper.find('.icon-right').exists()).toBe(true)
    })
  })

  describe('Events', () => {
    it('emits click event when not loading', async () => {
      const wrapper = createWrapper()
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click event when loading', async () => {
      const wrapper = createWrapper({ loading: true })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Ripple Effect', () => {
    it('creates ripple effect on click', async () => {
      const wrapper = createWrapper()
      const rect = {
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      }
      wrapper.element.getBoundingClientRect = vi.fn().mockReturnValue(rect)

      await wrapper.trigger('click', {
        clientX: 50,
        clientY: 25,
      })

      const ripple = wrapper.find('.ripple')
      expect(ripple.exists()).toBe(true)

      const rippleStyle = ripple.attributes('style')
      expect(rippleStyle).toContain('width: 100px')
      expect(rippleStyle).toContain('height: 100px')
    })

    it('removes ripple effect after animation', async () => {
      vi.useFakeTimers()
      const wrapper = createWrapper()

      wrapper.element.getBoundingClientRect = vi.fn().mockReturnValue({
        width: 100,
        height: 50,
        left: 0,
        top: 0,
      })


      await wrapper.trigger('click')
      expect(wrapper.find('.ripple').exists()).toBe(true)
      vi.advanceTimersByTime(600)
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.ripple').exists()).toBe(false)

      vi.useRealTimers()
    })
  })

  describe('Accessibility', () => {
    it('has correct role attribute', () => {
      const wrapper = createWrapper()
      expect(wrapper.attributes('role')).toBe('button')
    })

    it('is disabled when in loading state', () => {
      const wrapper = createWrapper({ loading: true })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })

    it('applies correct opacity when disabled', () => {
      const wrapper = createWrapper({ loading: true })
      expect(wrapper.classes()).toContain('disabled:opacity-[0.5]')
    })
  })
})
