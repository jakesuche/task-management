<template>
  <aside class="w-54 bg-white border-r border-gray-200">
    <div class="p-4">
      <h2 class="text-2xl font-bold">TaskMaster</h2>
    </div>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.href">
          <a
            :to="item.href"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 cursor-pointer"
            :class="{ 'text-gray-900 dark:text-gray-50': item.href === '/dashboard' }"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
    <div class=" mt-auto">
      <a
        to="/help"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 cursor-pointer"
      >
        <HelpCircle class="h-4 w-4" />
        Help & Support
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Home, CheckSquare, Calendar, Settings, HelpCircle } from 'lucide-vue-next';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];
</script>
