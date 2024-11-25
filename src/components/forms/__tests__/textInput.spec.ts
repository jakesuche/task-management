import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import InputComponent from '@/components/forms/text-input.vue'

describe('InputComponent', () => {
  const defaultProps = {
    label: 'Test Label',
    modelValue: '',
    type: 'text',
    placeholder: 'Enter text...',
    id: 'test-input',
    name: 'test-input',
  }

  const mountComponent = (props = {}) => {
    return mount(InputComponent, {
      props: {
        ...defaultProps,
        ...props,
      },
    })
  }

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('label').text()).toBe('Test Label')
      expect(wrapper.find('input').exists()).toBe(true)
      const input = wrapper.find('input')
      expect(input.attributes('type')).toBe('text')
      expect(input.attributes('placeholder')).toBe('Enter text...')
      expect(input.attributes('id')).toBe('test-input')
      expect(input.attributes('name')).toBe('test-input')
    })

    it('renders required asterisk when required prop is true', () => {
      const wrapper = mountComponent({ required: true })

      expect(wrapper.find('.text-red-500').exists()).toBe(true)
      expect(wrapper.find('.text-red-500').text()).toBe('*')
    })

    it('shows error text when provided', () => {
      const errorText = 'This field is required'
      const wrapper = mountComponent({ errorText })

      expect(wrapper.find('.text-red-600').text()).toBe(errorText)
      expect(wrapper.find('input').classes()).toContain('border-red-500')
    })

    it('applies custom classes when provided', () => {
      const customClasses = 'custom-class-1 custom-class-2'
      const wrapper = mountComponent({ customClasses })

      expect(wrapper.classes()).toContain('custom-class-1')
      expect(wrapper.classes()).toContain('custom-class-2')
    })

    it('disables input when disabled prop is true', () => {
      const wrapper = mountComponent({ disabled: true })

      const input = wrapper.find('input')
      expect(input.attributes('disabled')).toBeDefined()
      expect(input.classes()).toContain('disabled:bg-slate-50')
    })
  })

  describe('Events', () => {
    it('emits update:modelValue event on input', async () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      await input.setValue('new value')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
    })

    it('emits blur event when input loses focus', async () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
      expect(wrapper.emitted('blur')).toHaveLength(1)
    })

    it('emits focus event when input gains focus', async () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
      expect(wrapper.emitted('focus')).toHaveLength(1)
    })

    it('emits enter event when Enter key is pressed', async () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      await input.trigger('keypress', {
        key: 'Enter',
      })

      expect(wrapper.emitted('enter')).toBeTruthy()
      expect(wrapper.emitted('enter')).toHaveLength(1)
    })

    it('does not emit enter event when other keys are pressed', async () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      await input.trigger('keypress', {
        key: 'a',
      })

      expect(wrapper.emitted('enter')).toBeFalsy()
    })
  })

  describe('Computed Properties', () => {
    it('computes input type correctly', () => {
      const types = ['text', 'password', 'email', 'number']

      types.forEach((type) => {
        const wrapper = mountComponent({ type })
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe(type)
      })
    })
  })

  describe('Slots', () => {
    it('renders action slot content when provided', () => {
      const wrapper = mount(InputComponent, {
        props: defaultProps,
        slots: {
          action: '<button>Action</button>',
        },
      })

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').text()).toBe('Action')
    })
  })

  describe('Styling', () => {
    it('has correct base classes', () => {
      const wrapper = mountComponent()
      const input = wrapper.find('input')

      const expectedClasses = [
        'bg-white',
        'border',
        'border-gray-300',
        'text-gray-900',
        'text-sm',
        'rounded-lg',
        'focus:ring-blue-200',
        'focus:border-blue-200',
        'block',
        'w-full',
        'p-2.5',
      ]

      expectedClasses.forEach((className) => {
        expect(input.classes()).toContain(className)
      })
    })
  })
})
