import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '@/components/misc/bagde.vue'
import { cn } from '@/util/common'

// Mock the cn function
vi.mock('@/util/common', () => ({
  cn: vi.fn((...args) => args.join(' ')),
}))

describe('Badge', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'Test Badge',
      },
    })
    expect(wrapper.text()).toBe('Test Badge')
    expect(wrapper.classes()).toContain('inline-flex')
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.classes()).toContain('border')
    expect(wrapper.classes()).toContain('text-primary-foreground')
  })

  it('applies variant classes correctly', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline']
    variants.forEach((variant) => {
      const wrapper = mount(Badge, {
        props: { variant: variant as 'default' | 'secondary' | 'destructive' | 'outline' },
        slots: { default: 'Test Badge' },
      })
      if (variant === 'default') {
        expect(wrapper.classes()).toContain('text-primary-foreground')
      } else if (variant === 'secondary') {
        expect(wrapper.classes()).toContain('bg-secondary')
      } else if (variant === 'destructive') {
        expect(wrapper.classes()).toContain('bg-destructive')
      } else if (variant === 'outline') {
        expect(wrapper.classes()).toContain('text-foreground')
      }
    })
  })

  it('applies custom className', () => {
    const wrapper = mount(Badge, {
      props: {
        className: 'custom-class',
      },
      slots: {
        default: 'Test Badge',
      },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('passes through attributes', () => {
    const wrapper = mount(Badge, {
      attrs: {
        id: 'test-id',
        'data-testid': 'badge',
      },
      slots: {
        default: 'Test Badge',
      },
    })
    expect(wrapper.attributes('id')).toBe('test-id')
    expect(wrapper.attributes('data-testid')).toBe('badge')
  })

  it('validates variant prop', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    mount(Badge, {
      props: {
        variant: 'invalid-variant' as 'default' | 'secondary' | 'destructive' | 'outline'
      },
    })
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('combines classes correctly', () => {
    mount(Badge, {
      props: {
        variant: 'secondary',
        className: 'custom-class',
      },
    })
    expect(cn).toHaveBeenCalledWith(
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap',
      'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      'custom-class',
    )
  })
})
