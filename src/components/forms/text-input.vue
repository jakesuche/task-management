<template>
  <div class="relative" :class="customClasses">
    <slot name="action" />
    <label :id="id" class="mb-2.5 block text-surface-700 font-medium text-xs">
      {{ label }}
      <span v-if="required" class="text-meta-1 text-red-500">*</span>
    </label>
    <div class="relative w-auto h-auto">
      <input
        :id="id"
        class="placeholder:text-sm placeholder:font-thin bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 disabled:bg-slate-50"
        @blur="handleBlur"
        @input="handleChange"
        @focus="handleFocus"
        @keypress="handleEnter"
        :type="computedType"
        :value="modelValue"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :class="errorText && 'border-red-500'"
      />
    </div>
    <Transition name="slide-fade">
      <span v-if="errorText" class="text-xs text-red-600">
        {{ errorText }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  customClasses: String,
  id: String,
  name: String,
  value: String,
  modelValue: String,
  disabled: Boolean,
  required: {
    type: Boolean,
    default: false,
  },
  errorText: String,
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'update:value', 'enter'])
const computedType = computed(() => {
  return props.type
})
const handleChange = ({ target }: Event) =>
  emit('update:modelValue', (target as HTMLInputElement).value)
const handleBlur = (e: Event) => emit('blur', e)
const handleFocus = (e: Event) => emit('focus', e)
const handleEnter = (e: KeyboardEvent) => e.key === 'Enter' && emit('enter')
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
