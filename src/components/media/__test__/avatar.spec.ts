import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '@/components/media/avartar.vue'

describe('Avatar Component', () => {
  const mountComponent = (props = {}) => {
    return mount(Avatar, {
      props: {
        ...props,
      },
    })
  }
  describe('Image Avatar', () => {
    it('renders image when src is provided', () => {
      const wrapper = mountComponent({
        src: 'https://example.com/avatar.jpg',
        name: 'John Doe',
      })

      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
      expect(img.attributes('alt')).toBe('John Doe')
      expect(img.classes()).toContain('w-10')
      expect(img.classes()).toContain('h-10')
      expect(img.classes()).toContain('rounded-full')
    })

    it('does not render image when src is not provided', () => {
      const wrapper = mountComponent({
        name: 'John Doe',
      })

      expect(wrapper.find('img').exists()).toBe(false)
    })
  })

  describe('Initials Avatar', () => {
    it('renders initials when no src is provided', () => {
      const wrapper = mountComponent({
        name: 'John Doe',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.exists()).toBe(true)
      expect(initialsDiv.text()).toBe('JD')
      expect(initialsDiv.classes()).toContain('bg-primary-300')
      expect(initialsDiv.classes()).toContain('rounded-full')
    })

    it('handles single name for initials', () => {
      const wrapper = mountComponent({
        name: 'J',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.text()).toBe('J')
    })

    it('handles long names by taking first two names only', () => {
      const wrapper = mountComponent({
        name: 'John Richard Doe Smith',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.text()).toBe('JR')
    })

    it('handles empty name prop', () => {
      const wrapper = mountComponent({
        name: '',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.text()).toBe('')
    })
  })

  // Test name display
  describe('Name Display', () => {
    it('shows name when show_name prop is true', () => {
      const wrapper = mountComponent({
        name: 'John Doe',
        show_name: true,
      })

      const nameSpan = wrapper.find('span')
      expect(nameSpan.isVisible()).toBe(true)
      expect(nameSpan.text()).toBe('John Doe')
      expect(nameSpan.classes()).toContain('ml-3')
      expect(nameSpan.classes()).toContain('text-sm')
      expect(nameSpan.classes()).toContain('font-medium')
      expect(nameSpan.classes()).toContain('text-gray-700')
    })

    it('hides name when show_name prop is false', () => {
      const wrapper = mount(Avatar, {
        props: {
          name: 'John Doe',
          show_name: false,
        },
      })

      const nameSpan = wrapper.find('span')
      expect(nameSpan.isVisible()).toBe(false)
    })

    it('hides name by default when show_name prop is not provided', () => {
      const wrapper = mountComponent({
        name: 'John Doe',
      })

      const nameSpan = wrapper.find('span')
      expect(nameSpan.isVisible()).toBe(false)
    })
  })

  // Test responsive layout
  describe('Layout', () => {
    it('maintains flex layout with correct alignment', () => {
      const wrapper = mountComponent({
        name: 'John Doe',
        show_name: true,
      })

      const container = wrapper.find('div')
      expect(container.classes()).toContain('flex')
      expect(container.classes()).toContain('items-center')
    })
  })

  // Test prop types and defaults
  describe('Props', () => {
    it('accepts all expected props with correct types', () => {
      const wrapper = mountComponent({
        src: 'https://example.com/avatar.jpg',
        name: 'John Doe',
        show_name: true,
      })

      expect(wrapper.props().src).toBe('https://example.com/avatar.jpg')
      expect(wrapper.props().name).toBe('John Doe')
      expect(wrapper.props().show_name).toBe(true)
    })

    it('works with minimal props', () => {
      const wrapper = mount(Avatar)
      expect(wrapper.exists()).toBe(true)
    })
  })

  // Test edge cases
  describe('Edge Cases', () => {
    // it('handles undefined props gracefully', () => {
    //   const wrapper = mount(Avatar)
    //   expect(() => wrapper.vm.initials).not.toThrow()
    // })
//
    it('handles names with special characters', () => {
      const wrapper = mountComponent({
        name: 'María-José García',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.text()).toBe('MG')
    })

    it('handles names with extra spaces', () => {
      const wrapper = mountComponent({
        name: '  John   Doe  ',
      })

      const initialsDiv = wrapper.find('div.w-8')
      expect(initialsDiv.text()).toBe('JD')
    })
  })
})
