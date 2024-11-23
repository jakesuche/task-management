<template>
  <div class="flex items-center border rounded-lg px-2 py-1 w-full">
    <IconsSearch :icon-position="iconPosition" v-if="iconPosition === 'left'" />
    <input
      v-model="inputValue"
      :placeholder="placeholder || 'Search...'"
      class="flex-1 outline-none placeholder:text-sm placeholder:font-thin w-full text-sm h-6 text-surface-900"
      type="text"
      :class="inputClass"
      @keypress="handleEnter"
    />
    <IconsSearch
      :icon-position="iconPosition"
      v-if="iconPosition === 'right'"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  iconPosition?: "left" | "right";
  inputClass?: string;
}>();

const inputValue = ref(props.modelValue);

// Watch for changes in the modelValue prop and update the input value accordingly
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

// Emit an update event whenever the input value changes
watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const emit = defineEmits(["update:modelValue", "enter"]);
const handleEnter = (e: KeyboardEvent) => e.key === "Enter" && emit("enter");

</script>

<style scoped>
.search-input {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
}

.search-input input {
  border: none;
  outline: none;
  flex: 1;
}
</style>
