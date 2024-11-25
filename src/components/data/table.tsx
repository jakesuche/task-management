import { cn } from '@/util/common'
import { defineComponent, h } from 'vue'

// Table component
export const Table = defineComponent({
  name: 'CustomeTable',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        { class: 'w-full overflow-auto' },
        h(
          'table',
          { class: cn('w-full caption-bottom text-sm', props.className) },
          slots.default?.(),
        ),
      )
  },
})

// TableHeader component
export const TableHeader = defineComponent({
  name: 'TableHeader',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () => h('thead', { class: cn('[&_tr]:border-b', props.className) }, slots.default?.())
  },
})

// TableBody component
export const TableBody = defineComponent({
  name: 'TableBody',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h('tbody', { class: cn('[&_tr:last-child]:border-0', props.className) }, slots.default?.())
  },
})

// TableFooter component
export const TableFooter = defineComponent({
  name: 'TableFooter',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'tfoot',
        { class: cn('bg-primary font-medium text-primary-foreground', props.className) },
        slots.default?.(),
      )
  },
})

// TableRow component
export const TableRow = defineComponent({
  name: 'TableRow',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'tr',
        {
          class: cn(
            'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
            props.className,
          ),
        },
        slots.default?.(),
      )
  },
})

// TableHead component
export const TableHead = defineComponent({
  name: 'TableHead',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'th',
        {
          class: cn(
            'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
            props.className,
          ),
        },
        slots.default?.(),
      )
  },
})

// TableCell component
export const TableCell = defineComponent({
  name: 'TableCell',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'td',
        {
          class: cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', props.className),
        },
        slots.default?.(),
      )
  },
})

// TableCaption component
export const TableCaption = defineComponent({
  name: 'TableCaption',
  props: {
    className: String,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'caption',
        {
          class: cn('mt-4 text-sm text-muted-foreground', props.className),
        },
        slots.default?.(),
      )
  },
})
