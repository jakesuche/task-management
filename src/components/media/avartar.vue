<template>
  <div class="flex items-center">
    <img
      v-if="src"
      class="w-10 h-10 rounded-full"
      :src="props?.src"
      :alt="props?.name"
    />

    <div
      v-else
      class="w-8 h-8 flex items-center justify-center bg-primary-300 text-white rounded-full uppercase text-xs"
    >
      {{ initials }}
    </div>
    <span v-show="show_name" class="ml-3 text-sm font-medium text-gray-700">{{
      name
    }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ src?: string; name?: string; show_name?: boolean }>();

const initials = computed(() => {
  if (props?.name) {
    const names = props?.name?.split(" ");
    return names?.slice(0,2).map((n) => n[0]).join("");
  }
});
</script>
