<template>
  <Toast />
  <Comfirmation />
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <AppSideBar />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <Navbar />
      <main class="py-9 px-2">
        <ErrorBoundary>
          <TaskDashboard />
        </ErrorBoundary>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskDashboard from '@/views/task-dashboard/task-dashboard.vue'
import Navbar from '@/components/navbar/navbar.vue'
import AppSideBar from '@/components/app-side-bar/app-side-bar.vue'
import Toast from '@/components/toast/toast.vue'
import Comfirmation from '@/components/overlay/confirm-dialog.vue'
import ErrorBoundary from './components/feedback/error-boundary/error-boundary.vue'
</script>
<style scoped></style>
