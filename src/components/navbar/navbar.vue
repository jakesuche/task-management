<template>
  <nav class="border-b border-gray-200 bg-white sticky">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-2xl font-bold text-gray-900">TaskMaster</span>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <input
              type="search"
              placeholder="Search..."
              class="max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
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
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Profile</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Settings</a
                >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >Sign out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bell, User } from 'lucide-vue-next';

const isUserMenuOpen = ref(false);
</script>

