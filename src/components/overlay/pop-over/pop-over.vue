<template>
  <div class="relative inline-block text-left">
    <!-- Trigger -->
    <div ref="toggle" @click.stop="togglePopover" :aria-expanded="isOpen" aria-controls="popover" :id="triggerId">
      <slot name="trigger"></slot>
    </div>

    <!-- Popover -->
    <transition name="fade">
      <div
        v-if="isOpen"
        :id="popoverId"
        class="absolute z-10 mt-2 w-56 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        :style="popoverStyle"
        role="dialog"
        :aria-labelledby="triggerId"
        aria-modal="true"
        ref="popover"
        :class="class"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { useClickOutside } from '@/composables/useClickOutside';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({
  class:String
})

const isOpen = ref(false);
const popover = ref<HTMLElement | null>(null); // Define the popover reference
const triggerId = `trigger-${Math.random().toString(36).substring(7)}`;
const popoverId = `popover-${Math.random().toString(36).substring(7)}`;
const toggle = ref<HTMLElement | null>(null)
const popoverStyle = ref({});

const togglePopover = () => {
  isOpen.value = !isOpen.value;
};

const closePopover = () => {
  isOpen.value = false;
};

useClickOutside(popover, (e) => {
  const clickedInsideToggle = toggle.value && toggle.value.contains(e.target as Node);
  if(!clickedInsideToggle){
      closePopover()
  }

});



const adjustPopoverPosition = () => {
  const popoverElement = popover.value; // Reference the popover element
  if (!popoverElement) return;

  const rect = popoverElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  if (rect.right > viewportWidth) {
    popoverStyle.value = {
      right: '0',
      left: 'auto',
    };
  } else {
    popoverStyle.value = {
      left: '0',
      right: 'auto',
    };
  }
};

onMounted(() => {
  window.addEventListener('resize', adjustPopoverPosition);
  window.addEventListener('scroll', adjustPopoverPosition);
  adjustPopoverPosition();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustPopoverPosition);
  window.removeEventListener('scroll', adjustPopoverPosition);
});

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
