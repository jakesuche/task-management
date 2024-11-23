<template>
  <div
    v-show="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 py-1"

    @click.self="closeOnOverlay ? closeDialog() : null"
  >
    <transition name="scale-fade">
      <div
        v-if="open"
        aria-modal="true"
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"

        class="bg-white rounded-lg shadow-lg overflow-hidden w-full max-h-full flex flex-col"
        :class="customeClass"
      >
        <div
          v-if="!hideHeader"
          class="flex justify-between items-center p-4 "
          :class="header && 'border-b border-gray-200'"
        >
          <h4  class="text-lg font-medium tracking-wider">{{ header }}</h4>
          <button

            aria-label="Close dialog"
            @click="closeDialog"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- <div class="mt-4">
          <slot></slot>
        </div> -->
         <div id="dialogDescription" class="p-4 overflow-y-auto flex-1">
            <slot></slot>
          </div>
        <!-- <div class="flex justify-end mt-6 p-3">
          <button
            @click="closeDialog"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="confirmAction"
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            {{ confirmButtonText }}
          </button>
        </div> -->
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'overlay-dialog',
})

// Define the props
defineProps({
  header: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    required: true,
  },
  confirmButtonText: {
    type: String,
    default: "Save",
  },
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
  customeClass: {
    type: String,
    required: false,
  },
  hideHeader:Boolean
});

// Emit events
const emit = defineEmits(["update:visible", "confirm"]);

// Methods
const closeDialog = () => {
  emit("update:visible", false);
};

// const confirmAction = () => {
//   emit("confirm");
//   closeDialog();
// };
</script>

<style scoped>
/* Add any additional styles here */
.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: all 0.3s ease;
}
.scale-fade-enter-from,
.scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scale(0);
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>

<!-- usage  -->
<!-- <OverlayDialog
      :header="'Edit Profile'"
      :open="dialogVisible"
      :confirmButtonText="'Save'"
      @update:visible="dialogVisible = $event"
      @confirm="handleConfirm"
    >
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>
    </OverlayDialog> -->
