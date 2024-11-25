import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DropdownComponent from '@/components/forms/select-input.vue'

describe('DropdownComponent', () => {
  const defaultProps = {
    label: 'Test Label',
    modelValue: '',
    options: [
      { label: 'Option 1', value: 'value1' },
      { label: 'Option 2', value: 'value2' },
      { label: 'Option 3', value: 'value3' },
    ],
  }

  const mountComponent = (props = {}) => {
    return mount(DropdownComponent, {
      props: {
        ...defaultProps,
        ...props,
      },
    })
  }

  it('renders correctly with default props', () => {
    const wrapper = mountComponent()

    // Check label
    expect(wrapper.find('label').text()).toBe('Test Label')

    // Check placeholder text when no selection
    expect(wrapper.find('.text-surface-400').text()).toBe('Select...')

    // Check if dropdown is closed by default
    expect(wrapper.find('.dropdown-content').exists()).toBe(false)
  })

  it('opens dropdown when toggle is clicked', async () => {
    const wrapper = mountComponent()
    await wrapper.find('.cursor-pointer').trigger('click')

    // Check if dropdown is opened
    expect(wrapper.find('.dropdown-content').exists()).toBe(true)

    // Verify all options are rendered
    const options = wrapper.findAll('.dropdown-content .cursor-pointer')
    expect(options).toHaveLength(3)
    expect(options[0].text()).toBe('Option 1')
  })

  it('selects an option and emits update:modelValue', async () => {
    const wrapper = mountComponent()

    // Open dropdown
    await wrapper.find('.cursor-pointer').trigger('click')


    // Click first option
    const options = wrapper.findAll('.dropdown-content .cursor-pointer')
    await options[0].trigger('click')

    // Check if correct value is emitted
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['value1'])

    // Check if dropdown is closed after selection
    expect(wrapper.find('.dropdown-content').exists()).toBe(false)

    // Check if selected value is displayed
    expect(wrapper.find('.text-primary-600').text()).toBe('Option 1')
  })

  it('displays error text when provided', () => {
    const wrapper = mountComponent({
      errorText: 'This is an error',
    })

    expect(wrapper.find('.text-red-600').text()).toBe('This is an error')
    expect(wrapper.find('.border').classes()).toContain('border-red-500')
  })

  it('disables dropdown when disabled prop is true', async () => {
    const wrapper = mountComponent({
      disabled: true,
    })

    await wrapper.find('.cursor-pointer').trigger('click')

    // Dropdown should not open when disabled
    expect(wrapper.find('.dropdown-content').exists()).toBe(false)
  })

  it('updates selected item when modelValue changes externally', async () => {
    const wrapper = mountComponent()

    // Update modelValue prop
    await wrapper.setProps({
      modelValue: 'value2',
    })

    // Check if correct option is displayed
    expect(wrapper.find('.text-primary-600').text()).toBe('Option 2')
  })

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mountComponent()

    // Open dropdown
    await wrapper.find('.cursor-pointer').trigger('click')
    expect(wrapper.find('.dropdown-content').exists()).toBe(true)

    // Simulate click outside
    const clickOutsideEvent = new Event('click')
    document.dispatchEvent(clickOutsideEvent)

    // Check if dropdown is closed
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.dropdown-content').exists()).toBe(false)
  })


  it('displays errorText when provided', () => {
    const wrapper = mountComponent({
      errorText: 'This field is required',
    })
    expect(wrapper.text()).toContain('This field is required')
    expect(wrapper.find('.text-red-600').exists()).toBe(true)
  })

})
