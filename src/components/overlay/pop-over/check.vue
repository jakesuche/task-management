<template>
  <div ref="popoverTrigger" class="relative">
    <button @click="togglePopover" ref="trigger" aria-expanded="popoverVisible" aria-controls="popover">
      <slot name="trigger">Toggle Popover</slot>
    </button>
    <transition name="fade">
      <div
        v-if="popoverVisible"
        ref="popover"
        :class="popoverClasses"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popoverLabel"
        @click.outside="closePopover"
      >
        <slot name="content">Popover Content</slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const popoverVisible = ref(false);
const popover = ref(null);
const popoverTrigger = ref(null);

const popoverClasses = computed(() => {
  return popover.value ? `absolute ${calculatePopoverPosition()}` : 'hidden';
});

function togglePopover() {
  popoverVisible.value = !popoverVisible.value;
  if (popoverVisible.value) {
    adjustPopoverPosition();
  }
}

function closePopover() {
  popoverVisible.value = false;
}

function calculatePopoverPosition() {
  if (!popover.value || !popoverTrigger.value) return 'bottom-0 left-0';

  const triggerRect = popoverTrigger.value.getBoundingClientRect();
  const popoverRect = popover.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  if (triggerRect.bottom + popoverRect.height > viewportHeight) {
    return 'bottom-full'; // Popover appears above the trigger
  } else {
    return 'top-full'; // Popover appears below the trigger
  }
}

function adjustPopoverPosition() {
  const position = calculatePopoverPosition();
  popover.value.classList.remove('top-full', 'bottom-full');
  popover.value.classList.add(position);
}

onMounted(() => {
  window.addEventListener('resize', adjustPopoverPosition);
  window.addEventListener('scroll', adjustPopoverPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustPopoverPosition);
  window.removeEventListener('scroll', adjustPopoverPosition);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
