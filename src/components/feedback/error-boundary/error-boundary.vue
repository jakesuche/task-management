<template>
  <slot v-if="!errorOccurred" />
  <slot
    v-else
    name="fallback"
    :error="error"
    :resetError="resetError"
  >
    <div class="fixed inset-0 flex items-center justify-center p-4 bg-gray-100">
      <div class="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="p-6 sm:p-8">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <AlertTriangleIcon class="w-8 h-8 text-red-600" />
          </div>
          <h2 class="mb-2 text-2xl font-bold text-center text-gray-800">Oops! Something went wrong</h2>
          <p class="mb-6 text-center text-gray-600">{{ error?.message || 'An unexpected error occurred.' }}</p>
          <div class="space-y-4">
            <Button
              @click="resetError"
            fullWidth
            variant="outline"
            >
              Try Again
            </Button>
            <Button
              @click="reloadPage"
              class=""
              fullWidth
            >
              Reload Page
            </Button>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            If the problem persists, please contact our
            <a href="#" class="font-medium text-blue-600 hover:underline">support team</a>.
          </p>
        </div>
      </div>
    </div>
  </slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { AlertTriangleIcon } from 'lucide-vue-next'
import Button from '@/components/button/button.vue';

const error = ref<Error | null>(null)
const errorOccurred = ref(false)

onErrorCaptured((capturedError, instance, info) => {
  error.value = capturedError
  errorOccurred.value = true

  // Optional: Log error to monitoring service
  console.error('Error captured:', capturedError, info)

  // Prevent error from propagating
  return false
})

const resetError = () => {
  error.value = null
  errorOccurred.value = false
}

const reloadPage = () => {
  window.location.reload()
}
</script>
