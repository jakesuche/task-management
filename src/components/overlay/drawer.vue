<template>
  <Transition
    name="drawer"
    enter-active-class="transition ease-out duration-300"
    leave-active-class="transition ease-in duration-300"
    enter-from-class="opacity-0 translate-x-full"
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    leave-to-class="opacity-0 translate-x-full"
  >
    <Teleport to="body" v-if="isVisible">
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      >
        <div
          class="fixed inset-y-0 right-0 z-50 flex items-center justify-end overflow-auto"
        >
          <div
            class="bg-white h-full w-80 transform transition-transform duration-300"
          >
            <div v-if="$slots.header" class="font-bold text-xl mb-4">
              <slot name="header" />
            </div>

            <button
              class="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
              @click="handleClose"
            >
              &times;
            </button>
            <div class="mb-4" v-if="$slots.body">
              <slot name="body" />
            </div>
            <div class="flex justify-end" v-if="$slots.footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  placement: {
    type: String,
    default: "right",
  },
  finalFocusRef: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["close"]);

const isVisible = ref(props.isOpen);

const handleClose = () => {
  emit("close");
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        isVisible.value = false;
        document.body.style.overflow = "auto";
      }, 300); 
    }
  }
);
</script>
