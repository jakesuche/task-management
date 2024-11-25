import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarVisible = ref(false)

  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }

  return { isSidebarVisible, toggleSidebar }
})
