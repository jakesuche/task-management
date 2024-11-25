<template>
  <nav class="border-b border-gray-200 bg-white sticky top-0 z-50">
    <Container customClass="max-w-7xl xl:max-w-[1500px]">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button
            @click="toggleSidebar"
            class="lg:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <Menu class="h-6 w-6" />
          </button>
          <span class="text-2xl font-bold text-gray-900 ml-4 lg:ml-0">TaskMaster</span>
        </div>
        <div class="flex items-center">

          <div class="ml-4 flex items-center md:ml-6">
            <button class="p-1 rounded-full text-gray-400 hover:text-gray-500">
              <Bell class="h-6 w-6" />
            </button>
            <div class="ml-3 relative">
              <div>
                <button
                  @click="isUserMenuOpen = !isUserMenuOpen"
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <User class="h-6 w-6" />
                </button>
              </div>
              <div
                v-if="isUserMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Profile</a
                >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Settings</a
                >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bell, User, Menu } from 'lucide-vue-next';
import Container from '../container/container.vue';
import { useSidebarStore } from '@/stores/sidebar';

const { toggleSidebar } = useSidebarStore();
const isUserMenuOpen = ref(false);
</script>
