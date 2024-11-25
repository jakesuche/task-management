import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TextAreaComponent from '@/components/forms/text-area.vue'

describe('TextAreaComponent', () => {
  const defaultProps = {
    label: 'Your message',
    id: 'message',
    rows: 4,
    placeholder: 'Write your thoughts here...',
    modelValue: '',
  }

  const mountComponent = (props = {}) => {
    return mount(TextAreaComponent, {
      props: {
        ...defaultProps,
        ...props,
      },
    })
  }

  describe('Rendering', () => {
    it('renders with default props', () => {
      const wrapper = mountComponent()

      // Check label
      const label = wrapper.find('label')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('Your message')
      expect(label.attributes('for')).toBe('message')

      // Check textarea
      const textarea = wrapper.find('textarea')
      expect(textarea.exists()).toBe(true)
      expect(textarea.attributes('id')).toBe('message')
      expect(textarea.attributes('rows')).toBe('4')
      expect(textarea.attributes('placeholder')).toBe('Write your thoughts here...')
    })

    it('renders with custom props', () => {
      const customProps = {
        label: 'Custom Label',
        id: 'custom-id',
        rows: 6,
        placeholder: 'Custom placeholder',
        modelValue: 'Initial value',
      }

      const wrapper = mountComponent(customProps)
      const textarea = wrapper.find('textarea')

      expect(wrapper.find('label').text()).toBe('Custom Label')
      expect(textarea.attributes('id')).toBe('custom-id')
      expect(textarea.attributes('rows')).toBe('6')
      expect(textarea.attributes('placeholder')).toBe('Custom placeholder')
      expect(textarea.element.value).toBe('Initial value')
    })

    it('shows error text and styling when error is provided', () => {
      const wrapper = mountComponent({
        errorText: 'This field is required',
      })

      // Check error message
      const errorMessage = wrapper.find('.text-red-600')
      expect(errorMessage.exists()).toBe(true)
      expect(errorMessage.text()).toBe('This field is required')

      // Check error styling
      const textarea = wrapper.find('textarea')
      expect(textarea.classes()).toContain('border-red-500')
    })

    it('does not show error text when no error is provided', () => {
      const wrapper = mountComponent()

      expect(wrapper.find('.text-red-600').exists()).toBe(false)
      expect(wrapper.find('textarea').classes()).not.toContain('border-red-500')
    })
  })

  describe('Interactions', () => {
    it('emits update:modelValue event when text is input', async () => {
      const wrapper = mountComponent()
      const textarea = wrapper.find('textarea')
      const testValue = 'Test input text'

      await textarea.setValue(testValue)

      // Check emitted events
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([testValue])
    })

    it('updates textarea value when modelValue prop changes', async () => {
      const wrapper = mountComponent()
      const newValue = 'Updated text'

      await wrapper.setProps({
        modelValue: newValue,
      })

      expect(wrapper.find('textarea').element.value).toBe(newValue)
    })

    it('handles empty string input', async () => {
      const wrapper = mountComponent({
        modelValue: 'Initial text',
      })
      const textarea = wrapper.find('textarea')

      await textarea.setValue('')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    })
  })

  describe('Styling', () => {
    it('has correct base classes', () => {
      const wrapper = mountComponent()
      const textarea = wrapper.find('textarea')

      const expectedClasses = [
        'block',
        'p-2.5',
        'w-full',
        'text-sm',
        'text-gray-900',
        'rounded-lg',
        'border',
        'border-gray-300',
        'focus:ring-blue-500',
        'focus:border-blue-500',
      ]

      expectedClasses.forEach((className) => {
        expect(textarea.classes()).toContain(className)
      })
    })
  })

  describe('Accessibility', () => {
    it('maintains label-input association', () => {
      const wrapper = mountComponent({
        id: 'custom-id',
      })

      const label = wrapper.find('label')
      const textarea = wrapper.find('textarea')

      expect(label.attributes('for')).toBe('custom-id')
      expect(textarea.attributes('id')).toBe('custom-id')
    })
  })

  describe('Edge Cases', () => {
    it('handles long input text', async () => {
      const wrapper = mountComponent()
      const longText = 'a'.repeat(1000)

      await wrapper.find('textarea').setValue(longText)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([longText])
    })

    it('handles special characters', async () => {
      const wrapper = mountComponent()
      const specialChars = '!@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./\n\t'

      await wrapper.find('textarea').setValue(specialChars)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([specialChars])
    })

    it('handles multiline input', async () => {
      const wrapper = mountComponent()
      const multilineText = 'Line 1\nLine 2\nLine 3'

      await wrapper.find('textarea').setValue(multilineText)

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([multilineText])
    })
  })

})
