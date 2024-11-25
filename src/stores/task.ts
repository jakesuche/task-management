import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const getAllTasks = computed(() => tasks.value)
  const initialTasks = ref<Task[]>([])



  const addTask = (data: Task) => {
    tasks.value.push(data)

  }

  const setTask = (data: Task[]) => {
    tasks.value = data
    initialTasks.value = data
  }

  const updateTask = (updatedTask: Partial<Task>) => {
    const index = tasks.value.findIndex((task) => task.id.toString() === updatedTask.id?.toString())
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask }
    }
  }

  const removeTask = (id: string | number) => {
    // tasks.value = tasks.value.filter((task) => task.id !== id)
    const index = tasks.value.findIndex((task) => task.id === id)

    if (index !== -1) {
      tasks.value = [...tasks.value.slice(0, index), ...tasks.value.slice(index + 1)]
    } 
  }

  const applyFilters = (status?: string, priority?: string, sortBy?: string) => {
      let filtered = initialTasks.value.filter((task) => {
        const statusFilter = status ? task.status === status : true

        const priorityFilter = priority ? task.priority.toLowerCase().trim() === priority.toLowerCase().trim() : true
        return statusFilter && priorityFilter
      })
      if (sortBy) {
        if (sortBy === 'dueDate') {
          filtered = filtered.sort(
            (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
          )
        } else if (sortBy === 'dueDateDesc') {
          filtered = filtered.sort(
            (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
          )
        }
      }
      tasks.value = filtered
  }

  return { tasks: getAllTasks, setTask, addTask, updateTask, removeTask, applyFilters }
})
