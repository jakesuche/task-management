<template>
  <div v-if="confirmDialog.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h3 class="text-lg font-semibold mb-4">{{ confirmDialog.header }}</h3>
      <p class="mb-6">{{ confirmDialog.message }}</p>
      <div class="flex justify-end gap-2">
        <button @click="rejectDialog" class="px-4 py-2 border rounded hover:bg-gray-200">{{ confirmDialog.rejectLabel }}</button>
        <button @click="acceptDialog" :class="confirmDialog.acceptClass">{{ confirmDialog.acceptLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfirm } from '../../composables/useConfirm';

const { confirmDialog, acceptDialog, rejectDialog } = useConfirm();
</script>
