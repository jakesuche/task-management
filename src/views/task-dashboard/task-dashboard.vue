<script lang="ts" setup>
defineOptions({
  name: 'TaskDashboard',
})

import { ref, onMounted } from 'vue'
import TaskFilter from '@/views/task-filter/task-filter.vue'
import KanbarBoard from '../kanban-board/kanbar-board.vue';
import TaskList from '@/views/task-list/task-list.vue'
import { PlusIcon, ListIcon, LayoutIcon } from 'lucide-vue-next'
import Button from '@/components/button/button.vue'
import Tab from '@/components/panel/tab.vue'


// Importing the Task type

// Reactive states
const tasks = ref<Task[]>([])
const filteredTasks = ref<Task[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)
const isFormOpen = ref<boolean>(false)
const editingTask = ref<Task | null>(null)

// Fetch tasks from the server
const fetchTasks = async (): Promise<void> => {
  try {
    isLoading.value = true
    const response = await fetch('/api/tasks')
    if (!response.ok) throw new Error('Failed to fetch tasks')
    const data: Task[] = await response.json()
    tasks.value = data
    filteredTasks.value = data
  } catch (err) {
    error.value = 'An error occurred while fetching tasks'
  } finally {
    isLoading.value = false
  }
}

// Add a new task
const handleAddTask = async (newTask: Omit<Task, 'id'>): Promise<void> => {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
    if (!response.ok) throw new Error('Failed to add task')
    const addedTask: Task = await response.json()
    tasks.value.push(addedTask)
    filteredTasks.value.push(addedTask)
    isFormOpen.value = false
  } catch (err) {
    error.value = 'An error occurred while adding the task'
  }
}

// Update an existing task
const handleUpdateTask = async (updatedTask: Task): Promise<void> => {
  try {
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
    if (!response.ok) throw new Error('Failed to update task')
    const updatedTaskData: Task = await response.json()
    tasks.value = tasks.value.map((t) => (t.id === updatedTaskData.id ? updatedTaskData : t))
    filteredTasks.value = filteredTasks.value.map((t) =>
      t.id === updatedTaskData.id ? updatedTaskData : t,
    )
    editingTask.value = null
  } catch (err) {
    error.value = 'An error occurred while updating the task'
  }
}

// Delete a task
const handleDeleteTask = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (!response.ok) throw new Error('Failed to delete task')
    tasks.value = tasks.value.filter((t) => t.id !== id)
    filteredTasks.value = filteredTasks.value.filter((t) => t.id !== id)
  } catch (err) {
    error.value = 'An error occurred while deleting the task'
  }
}

// Filter tasks based on status, priority, or sorting
const handleFilter = (status: string, priority: string, sortBy: string): void => {
  let filtered = [...tasks.value]
  if (status) filtered = filtered.filter((task) => task.status === status)
  if (priority) filtered = filtered.filter((task) => task.priority === priority)
  if (sortBy === 'dueDate') {
    filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  } else if (sortBy === 'dueDateDesc') {
    filtered.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
  }
  filteredTasks.value = filtered
}

// Handle task drag-and-drop
const handleDragEnd = (result: any): void => {
  if (!result.destination) return
  const { source, destination } = result
  const updatedTasks = [...filteredTasks.value]
  const [reorderedTask] = updatedTasks.splice(source.index, 1)
  updatedTasks.splice(destination.index, 0, reorderedTask)

  const updatedTask = { ...reorderedTask, status: destination.droppableId }
  handleUpdateTask(updatedTask)

  filteredTasks.value = updatedTasks
}

// Fetch tasks on component mount
onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div class="max-w-7xl xl:max-w-[1500px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Task Management Dashboard</h1>
      <div class="mb-6">
        <TaskFilter @filter="handleFilter" />
      </div>
      <Button>
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
           <TaskList
            :tasks="filteredTasks"
            @edit="(task) => (editingTask = task)"
            @delete="handleDeleteTask"
          />
        </template>
        <template #board>
          <KanbarBoard />
        </template>
      </Tab>
      <!--
      <Tabs defaultValue="list" class="w-full">
        <TabsList class="mb-4">
          <TabsTrigger value="list">
            <ListIcon class="mr-2 h-4 w-4" /> List View
          </TabsTrigger>
          <TabsTrigger value="board">
            <LayoutIcon class="mr-2 h-4 w-4" /> Board View
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <TaskList
            :tasks="filteredTasks"
            @edit="(task) => (editingTask = task)"
            @delete="handleDeleteTask"
          />
        </TabsContent>
        <TabsContent value="board">
          <KanbanBoard
            :tasks="filteredTasks"
            @edit="(task) => (editingTask = task)"
            @delete="handleDeleteTask"
            @drag-end="handleDragEnd"
          />
        </TabsContent>
      </Tabs> -->
    </div>
    <!-- <TaskForm
      v-if="isFormOpen || editingTask"
      @submit="editingTask ? handleUpdateTask : handleAddTask"
      @close="() => {
        isFormOpen = false
        editingTask = null
      }"
      :task="editingTask"
    /> -->
  </div>
</template>
