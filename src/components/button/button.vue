<template>
  <button
    :class="[buttonClasses]"
    :disabled="loading"
    @click="handleClick"
    role="button"
    class="relative disabled:opacity-[0.5]"
    v-bind="$attrs"
    ref="buttonRef"
  >
    <!-- Left icon slot -->
    <span v-if="$slots.left" class="icon-left">
      <slot name="left"></slot>
    </span>

    <!-- Button label -->
    <span class="text-xs" v-if="label">{{ label }}</span>
    <slot class="text-xs"></slot>

    <!-- Loading spinner -->
    <span v-if="loading" class="spinner !border-white !border-l-transparent"></span>

    <!-- Right icon slot -->
    <span v-if="$slots.right" class="icon-right">
      <slot name="right"></slot>
    </span>

    <!-- Ripple Effect -->
    <span v-if="showRipple" :style="rippleStyle" class="ripple"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface ButtonProps {
  label?: string;
  variant?: 'link' | 'outline' | 'solid' | 'secondary';
  fullWidth?: boolean;
  loading?: boolean;
  customClasses?: string;
  class?: string;
}

const props = defineProps<ButtonProps>();
const emit = defineEmits<{
  (click: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center gap-2.5 py-3 px-10 text-center font-medium rounded-md text-sm overflow-hidden';
  const variantClasses = {
    link: 'bg-transparent text-primary-700 border-none hover:bg-opacity-10 !p-0',
    outline: 'bg-transparent text-surface-800 border border-[#6c668540] hover:bg-opacity-10',
    solid: 'bg-primary-950 text-white hover:bg-opacity-90',
    secondary: 'bg-primary-50 text-primary-500 hover:bg-opacity-90'
  };
  const fullWidthClasses = props.fullWidth ? 'w-full' : '';
  const loadingClasses = props.loading ? 'cursor-wait disabled:opacity-[0.8]' : '';

  return `${baseClasses} ${variantClasses[props.variant ?? 'solid']} ${fullWidthClasses} ${loadingClasses} ${props.customClasses ?? ''} ${props.class}`;
});

const showRipple = ref(false);
const rippleStyle = ref({});
const buttonRef = ref<HTMLButtonElement>();

const handleClick = (event: MouseEvent) => {
  if (!props.loading) {
    createRipple(event);
    emit('click', event);
  }
};

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  rippleStyle.value = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
  };

  showRipple.value = true;

  setTimeout(() => {
    showRipple.value = false;
  }, 600);
};

// Prevent automatic inheritance of attributes to the root element
defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
.spinner {
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: transparent;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 1s linear infinite;
}

.icon-left,
.icon-right {
  display: inline-flex;
  align-items: center;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background: rgba(255, 255, 255, 0.6);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
