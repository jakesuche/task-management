<template>
  <div class="w-full" :class="[container_classes,customClass]" :style="container_styles">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Define props
const props = defineProps({
  disableGutters: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "lg",
    validator: (value) =>
      ["xl", "2xl", "lg", "md", "sm", false].includes(value),
  },
  backgroundColor: {
    type: String,
    default: "white",
    validator: (value) => ["black", "white"].includes(value),
  },
  customClass:{
    type: String,
  }
});

// Computed properties for classes and styles
const container_classes = computed(() => {
  return [
    "box-border",
    "mx-auto",
    props.disableGutters ? "" : "px-4 md:px-6 sm:px-4",
    max_width_class.value,
  ]
    .filter(Boolean)
    .join(" ");
});

const max_width_class = computed(() => {
  switch (props.maxWidth) {
    case "2xl":
      return "max-w-screen-2xl";
    case "xl":
      return "max-w-screen-xl";
    case "lg":
      return "max-w-screen-lg";
    case "md":
      return "max-w-screen-md";
    case "sm":
      return "max-w-screen-sm";
    case false:
      return "max-w-none";
    default:
      return "max-w-screen-lg";
  }
});

const container_styles = computed(() => ({
  backgroundColor: props.backgroundColor === "black" ? "#000" : "transparent",
}));
</script>

<style scoped>
/* You can add additional custom styles here if needed */
</style>
