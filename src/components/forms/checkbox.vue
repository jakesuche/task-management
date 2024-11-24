<template>
  <div
    :class="[
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      isChecked ? 'bg-primary text-primary-foreground' : '',
      className,
    ]"
    role="checkbox"
    :aria-checked="isChecked"
    tabindex="0"
    @click="toggle"
    @keypress.enter.space.prevent="toggle"
  >
    <div v-if="isChecked" class="flex items-center justify-center text-current">
      <CheckIcon />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps , defineOptions, watch } from 'vue'
import { CheckIcon } from 'lucide-vue-next'

defineOptions({
  name: 'Checkbox',
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const isChecked = ref(false)

watch(
  () => props.modelValue,
  (newValue) => {
    isChecked.value = newValue
  },
)

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  isChecked.value = !isChecked.value
  emit('update:modelValue', isChecked.value)
}
</script>

<style scoped>
/* Add styles as needed */
.peer {
  display: inline-block;
  cursor: pointer;
}
</style>
