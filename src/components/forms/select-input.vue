<template>
  <div class="relative">
    <label class="block text-sm font-medium text-gray-700 mb-1" for="">
      {{ label }}
    </label>
    <div
      ref="toggle"
      class="border rounded-lg p-2.5 flex items-center cursor-pointer justify-between "
      :class="errorText && 'border-red-500'"
      @click="toggleDropdown"
    >
      <div class="flex items-center cursor-pointer space-x-2 flex-wrap gap-2">
        <span v-if="selectedItem" class="text-sm text-primary-600">{{ selectedItem.label }} </span>
        <span class="text-sm text-primary-600" v-else-if="modelValue">{{ modelValue }}</span>
        <span v-else class="text-sm text-surface-400">Select...</span>

      </div>
      <div class="ml-auto text-gray-600">
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
     <Transition name="slide-fade">
      <span v-if="errorText" class="text-xs text-red-600">
        {{ errorText }}
      </span>
    </Transition>
    <Transition  name="dropdown">
      <div
        ref="target"
        v-if="isOpen"
        class="absolute mt-2 w-full bg-white border rounded-md shadow-lg z-10 origin-top-center dropdown-content overflow-hidden"
      >
        <div ref="dropdownContent" class="max-h-60 overflow-auto">
          <template v-for="item in options" :key="item.value">
            <div
              class="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              @click="selectItem(item)"
            >
              <span class="text-sm">{{ item.label }}</span>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType, watch } from "vue";
import { useClickOutside } from '@/composables/useClickOutside'

interface Option {
  label: string;
  value: string;
}

const props = defineProps({
  label: {
    type: String as PropType<string>,
    default: ""
  },
  modelValue: {
    type: String as PropType<string>,
    default: ""
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => [{label: 'Label 1', value: 'value1'}, {label: 'Label 2', value: 'value2'}]
  },
  disabled:Boolean,
  errorText:String
});

const selectedItem = ref<Option | null>(null);
const isOpen = ref(false);
const dropdownContent = ref<HTMLElement | null>(null);
const emits = defineEmits(['update:modelValue']);
const target = ref<HTMLElement | null>(null);
const toggle = ref<HTMLElement | null>(null)



useClickOutside(target, (e) => {
  const clickedInsideToggle = toggle.value && toggle.value.contains(e.target as Node);
  if (!clickedInsideToggle) {
    isOpen.value = false;
  }
});

const toggleDropdown = () => {
  if(props.disabled) {return}
  isOpen.value = !isOpen.value;
};

const selectItem = (item: Option) => {
  selectedItem.value = item;
  emits('update:modelValue', item.value);
  isOpen.value = false;
};





// Watch for external changes in modelValue and update selectedItem
watch(() => props.modelValue, (newVal) => {
  selectedItem.value = props.options.find(option => option.value === newVal) || null;
});
</script>

<style scoped>
/* Animations for dropdown */
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
