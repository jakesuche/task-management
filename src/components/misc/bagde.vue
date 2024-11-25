<script lang="ts" setup>
import { cn } from '@/util/common'
import { computed, defineProps, type PropType } from 'vue'

// Variant-specific styles
const variantClasses = {
  default: 'border-transparent  text-primary-foreground hover:bg-primary/80',
  secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive:
    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
  outline: 'text-foreground',
} as const

// Props for the Badge component
const props = defineProps({
  className: String, // Custom classes
  variant: {
    type: String as PropType<keyof typeof variantClasses>,
    default: 'default', // Default variant
    validator: (value: string) =>
      ['default', 'secondary', 'destructive', 'outline'].includes(value),
  },
})

// Compute the combined class
const badgeClass = computed(() =>
  cn(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-nowrap',
    variantClasses[props.variant],
    props?.className,
  ),
)
</script>

<template>
  <div :class="badgeClass" class="inline-flex" v-bind="$attrs">
    <slot />
  </div>
</template>
