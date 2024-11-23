<template>
  <div>
    <!-- Tab navigation -->
    <div class="flex border-b">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        class="flex items-center px-4 py-2 -mb-px text-md font-medium border-b-2"
        :class="
          activeTab === index
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent text-gray-500 hover:text-blue-500'
        "
      >
        <!-- Icon -->
        <component
          v-if="tab.icon"
          :is="tab.icon"
          class="w-4 h-4 mr-2"
        />
        <!-- Label -->
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab content -->
    <div class="py-4 px-1">
      <slot :name="tabs?.[activeTab]?.name"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";

// Define the tab properties
type Props = {
  tabs: { label: string; name: string; icon?: any }[];
};

const props = defineProps({
  tabs: {
    type: Array as PropType<Props["tabs"]>,
    required: true,
  },
  defaultTab: {
    type: Number,
    default: 0,
  },
});

const activeTab = ref(props.defaultTab);
</script>

<style scoped>
button:focus {
  outline: none;
}
</style>
