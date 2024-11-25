<script lang="ts" setup>
defineOptions({
  name: 'TaskDashboard',
})

import { ref } from 'vue'
import TaskFilter from '@/views/task-filter/task-filter.vue'
import KanbarBoard from '../kanban-board/kanbar-board.vue'
import TaskList from '@/views/task-list/task-list.vue'
import { PlusIcon, ListIcon, LayoutIcon } from 'lucide-vue-next'
import Button from '@/components/button/button.vue'
import Tab from '@/components/panel/tab.vue'
import TaskForm from '@/views/task-form/task-form.vue'
import { useFetch } from '@/composables/useFetch'
import { endPointTask } from '@/util/end-points'
import { useMutation } from '@/composables/useMutation'
import { useToast } from '@/composables/useToast'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'
import TaskDetail from '@/views/task-detail/task-detail.vue'
import { useConfirmation } from '@/stores/confirmation'
import Container from '@/components/container/container.vue'

// Importing the Task type

// Reactive states
// const tasks = ref<Task[]>([])
const { addToast } = useToast()
const editingTask = ref<Task | null>(null)
const dialogVisible = ref(false)
const detailsDialog = ref(false)
const { isLoading } = useFetch<Task[]>(endPointTask)
const selectedTask = ref<null | Task>(null)
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const confirmationStore = useConfirmation()

const createUpdateTaskMutation = (taskId: number) => {
  return useMutation<{}, Task>(`${endPointTask}/${taskId}`, 'PUT')
}

const createDeleteMutation = (taskId: number) => {
  return useMutation<{}, Task>(`${endPointTask}/${taskId}`, 'DELETE')
}

const { mutate } = useMutation<{}, Task>(endPointTask, 'POST', {
  onSuccess(data) {
    addToast({ summary: 'Task added success', severity: 'success' })
    dialogVisible.value = false
    taskStore.addTask(data)
  },
})

const handleDialog = () => {
  dialogVisible.value = !dialogVisible.value
}

// Add a new task
const handleAddTask = async (newTask: Omit<Task, 'id'>): Promise<void> => {
  mutate(newTask)
}

// Delete a task
const handleDeleteTask = async (id: number): Promise<void> => {
  confirmationStore.show({
    onAccept() {
      taskStore.removeTask(id)
      const { mutate: deleteTask } = createDeleteMutation(id)
      deleteTask()
      addToast({ summary: 'Task removed', severity: 'success' })
    },
  })
}

// Filter tasks based on status, priority, or sorting
const handleFilter = (status: string, priority: string, sortBy: string): void => {
  taskStore.applyFilters(status, priority, sortBy)
}

// Handle task drag-and-drop
const handleDragEnd = async (result: Task[]): Promise<void> => {
  taskStore.setTask(result)
  const updatePromises = result.map((task) => {
    const { mutate } = useMutation<Task, Task>(
      `/tasks/${task.id}`, // Dynamic URL for each task
      'PUT',
    )
    return new Promise<void>((resolve, reject) => {
      mutate(task, {
        onSuccess: () => {
          resolve()
        },
        onError: (error) => {
          reject(error)
        },
      })
    })
  })
  try {
    await Promise.all(updatePromises)
    addToast({ severity: 'success', summary: 'Task updated successfully' })
  } catch (error) {
    addToast({ severity: 'success', summary: `Task failed'${error}` })
  }
}

const handleSelectTask = (task: Task) => {
  selectedTask.value = task
  detailsDialog.value = true
}

const handleTaskUpdate = (task: Task) => {
  const { mutate: update } = createUpdateTaskMutation(task.id)

  update(task, {
    onSuccess: (data) => {
      // console.log('Task updated successfully', data);
      taskStore.updateTask(data)
      addToast({ summary: 'Task updated success', severity: 'success' })
      detailsDialog.value = false
    },
    onError: () => {
      addToast({ summary: 'Failed to update task:', severity: 'error' })
    },
  })
}
</script>

<template>
  <Container
    class="max-w-7xl xl:max-w-[1500px] mx-auto !bg-white rounded-xl shadow-lg overflow-hidden !p-1"
  >
    <div class="p-2 md:p-8">
      <h1 class="text-xl font-bold mb-6 text-gray-800 md:text-3xl">Task Management Dashboard</h1>
      <div class="mb-6">
        <TaskFilter @filter="handleFilter" />
      </div>
      <Button @click="handleDialog">
        <PlusIcon class="mr-2 h-4 w-4" />

        Add New Task
      </Button>
      <Tab
        class="mt-4"
        :tabs="[
          { label: 'List View', name: 'list', icon: ListIcon },
          { label: 'Board View', name: 'board', icon: LayoutIcon },
        ]"
      >
        <template #list>
          <div v-if="isLoading">loading</div>
          <TaskList v-else :tasks="tasks" @edit="handleSelectTask" @delete="handleDeleteTask" />
        </template>
        <template #board>
          <div v-if="isLoading">loading</div>
          <KanbarBoard
            @update:tasks="handleDragEnd"
            v-else
            @delete="handleDeleteTask"
            @edit="handleSelectTask"
            :tasks="tasks"
          />
        </template>
      </Tab>
    </div>
    <overlay-dialog />
    <TaskDetail
      @close="
        () => {
          detailsDialog = false
        }
      "
      @update="handleTaskUpdate"
      :task="selectedTask!"
      :open="detailsDialog"
    />
    <TaskForm
      @update:visible="dialogVisible = $event"
      @submit="handleAddTask"
      @close="
        () => {
          dialogVisible = false
        }
      "
      :open="dialogVisible"
      :task="editingTask"
    />
  </Container>
</template>
