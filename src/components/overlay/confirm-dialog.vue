<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <div
      v-if="store.dialog.visible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 class="text-lg font-semibold mb-4">{{ store.dialog.header }}</h3>
        <p class="mb-6">{{ store.dialog.message }}</p>
        <div class="flex justify-end gap-2">
          <button
            @click="store.reject"
            class="px-4 py-2 border rounded hover:bg-gray-200"
          >
            {{ store.dialog.rejectLabel }}
          </button>
          <button
            @click="store.accept"
            :class="store.dialog.acceptClass"
          >
            {{ store.dialog.acceptLabel }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useConfirmation } from '@/stores/confirmation'

const store = useConfirmation()
</script>
