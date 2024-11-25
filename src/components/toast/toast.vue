<template>
  <transition-group
    name="toast"
    tag="div"
    class="fixed top-2 right-5 flex flex-col gap-4 z-50 w-full max-w-[300px]"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'p-3 rounded-lg shadow-lg flex items-center justify-between ',
        getSeverityClass(toast.severity),
      ]"
    >
      <div>
        <div class="font-medium text-sm">{{ toast.summary }}</div>
        <p class="text-xs">{{ toast.detail }}</p>
      </div>
      <button @click="removeToast(toast.id)" class="ml-4 text-xl">&times;</button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
import { computed } from 'vue'

const toastStore = useToast()
const toasts = computed(() => toastStore.toasts)

/**
 * remove toast by id
 */
const removeToast = (id: number) => {
  toastStore.removeToast(id)
}

/**
 * get serverity class
 */

const getSeverityClass = (severity: string) => {
  switch (severity) {
    case 'success':
      return 'bg-green-100 text-green-800'
    case 'info':
      return 'bg-blue-100 text-blue-800'
    case 'warn':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    case 'secondary':
      return 'bg-gray-100 text-gray-800'
    case 'contrast':
      return 'bg-black text-white'
    default:
      return ''
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translateX(0%);
}
</style>
