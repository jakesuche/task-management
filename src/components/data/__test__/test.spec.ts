import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/data/table'

describe('Table Components', () => {
  describe('Table Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(Table)
      expect(wrapper.find('table').exists()).toBe(true)
      expect(wrapper.find('div').classes()).toContain('w-full')
      expect(wrapper.find('div').classes()).toContain('overflow-auto')
      expect(wrapper.find('table').classes()).toContain('w-full')
      expect(wrapper.find('table').classes()).toContain('caption-bottom')
      expect(wrapper.find('table').classes()).toContain('text-sm')
    })

    it('applies custom className', () => {
      const wrapper = mount(Table, {
        props: {
          className: 'custom-class',
        },
      })
      expect(wrapper.find('table').classes()).toContain('custom-class')
    })

    it('renders slot content', () => {
      const wrapper = mount(Table, {
        slots: {
          default: '<div data-test="content">Test Content</div>',
        },
      })
      expect(wrapper.find('[data-test="content"]').exists()).toBe(true)
    })
  })

  describe('TableHeader Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableHeader)
      expect(wrapper.find('thead').exists()).toBe(true)
      expect(wrapper.find('thead').classes()).toContain('[&_tr]:border-b')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableHeader, {
        props: {
          className: 'custom-header',
        },
      })
      expect(wrapper.find('thead').classes()).toContain('custom-header')
    })
  })

  describe('TableBody Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableBody)
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tbody').classes()).toContain('[&_tr:last-child]:border-0')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableBody, {
        props: {
          className: 'custom-body',
        },
      })
      expect(wrapper.find('tbody').classes()).toContain('custom-body')
    })
  })

  describe('TableFooter Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableFooter)
      expect(wrapper.find('tfoot').exists()).toBe(true)
      expect(wrapper.find('tfoot').classes()).toContain('bg-primary')
      expect(wrapper.find('tfoot').classes()).toContain('font-medium')
      expect(wrapper.find('tfoot').classes()).toContain('text-primary-foreground')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableFooter, {
        props: {
          className: 'custom-footer',
        },
      })
      expect(wrapper.find('tfoot').classes()).toContain('custom-footer')
    })
  })

  describe('TableRow Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableRow)
      expect(wrapper.find('tr').exists()).toBe(true)
      expect(wrapper.find('tr').classes()).toContain('border-b')
      expect(wrapper.find('tr').classes()).toContain('transition-colors')
      expect(wrapper.find('tr').classes()).toContain('hover:bg-muted/50')
      expect(wrapper.find('tr').classes()).toContain('data-[state=selected]:bg-muted')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableRow, {
        props: {
          className: 'custom-row',
        },
      })
      expect(wrapper.find('tr').classes()).toContain('custom-row')
    })
  })

  describe('TableHead Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableHead)
      expect(wrapper.find('th').exists()).toBe(true)
      expect(wrapper.find('th').classes()).toContain('h-12')
      expect(wrapper.find('th').classes()).toContain('px-4')
      expect(wrapper.find('th').classes()).toContain('text-left')
      expect(wrapper.find('th').classes()).toContain('align-middle')
      expect(wrapper.find('th').classes()).toContain('font-medium')
      expect(wrapper.find('th').classes()).toContain('text-muted-foreground')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableHead, {
        props: {
          className: 'custom-head',
        },
      })
      expect(wrapper.find('th').classes()).toContain('custom-head')
    })
  })

  describe('TableCell Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableCell)
      expect(wrapper.find('td').exists()).toBe(true)
      expect(wrapper.find('td').classes()).toContain('p-4')
      expect(wrapper.find('td').classes()).toContain('align-middle')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableCell, {
        props: {
          className: 'custom-cell',
        },
      })
      expect(wrapper.find('td').classes()).toContain('custom-cell')
    })
  })

  describe('TableCaption Component', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(TableCaption)
      expect(wrapper.find('caption').exists()).toBe(true)
      expect(wrapper.find('caption').classes()).toContain('mt-4')
      expect(wrapper.find('caption').classes()).toContain('text-sm')
      expect(wrapper.find('caption').classes()).toContain('text-muted-foreground')
    })

    it('applies custom className', () => {
      const wrapper = mount(TableCaption, {
        props: {
          className: 'custom-caption',
        },
      })
      expect(wrapper.find('caption').classes()).toContain('custom-caption')
    })
  })

  // Integration test
  describe('Table Integration', () => {
    it('renders a complete table structure', () => {
      const wrapper = mount(Table, {
        slots: {
          default: `
            <table-caption>Sample Table</table-caption>
            <table-header>
              <table-row>
                <table-head>Header 1</table-head>
                <table-head>Header 2</table-head>
              </table-row>
            </table-header>
            <table-body>
              <table-row>
                <table-cell>Cell 1</table-cell>
                <table-cell>Cell 2</table-cell>
              </table-row>
            </table-body>
            <table-footer>
              <table-row>
                <table-cell>Footer 1</table-cell>
                <table-cell>Footer 2</table-cell>
              </table-row>
            </table-footer>
          `,
        },
        global: {
          components: {
            TableCaption,
            TableHeader,
            TableRow,
            TableHead,
            TableBody,
            TableCell,
            TableFooter,
          },
        },
      })

      expect(wrapper.find('table').exists()).toBe(true)
      expect(wrapper.find('caption').exists()).toBe(true)
      expect(wrapper.find('thead').exists()).toBe(true)
      expect(wrapper.find('tbody').exists()).toBe(true)
      expect(wrapper.find('tfoot').exists()).toBe(true)
      expect(wrapper.findAll('th')).toHaveLength(2)
      expect(wrapper.findAll('td')).toHaveLength(4)
    })
  })
})
