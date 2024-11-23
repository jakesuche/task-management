<template>
  <div class="relative">
    <!-- Block Card -->

    <div
        v-if="block"
      class="absolute top-0 left-0 bottom-0 w-full h-full z-[100] bg-[#00000015]"
    />

    <div v-if="block" class="absolute bottom-1/2 left-1/2 z-[110] translate-y-1/2">
      <LoadingSpinner />
    </div>

    <div class="rounded-lg ">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts" >

defineProps<{block:boolean}>()
</script>

<!-- Optional: No styles needed as Tailwind will handle it all -->
