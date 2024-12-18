<template>
  <div class="flex gap-4 overflow-x-auto pb-4" v-if="tasks.length > 0">
    <div v-for="column in columns" :key="column.id" class="flex-1 min-w-[300px]">
      <h3 class="font-semibold mb-2">{{ column.title }}</h3>
      <VueDraggable
        :list="getTasksForColumn(column.id).value"
        :group="{ name: 'tasks', pull: true, put: true }"
        item-key="id"
        @change="(e) => onDragChange(e, column.id)"
        class="bg-gray-100 p-2 rounded-md min-h-[500px]"
      >
        <div :key="task.id" v-for="task in getTasksForColumn(column.id).value">
          <div class="bg-white p-4 mb-2 rounded shadow">
            <h4 class="font-medium mb-2">{{ task.title }}</h4>
            <p class="text-sm text-gray-600 mb-2">{{ task.description }}</p>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <span :class="getStatusColor(task.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ task.status }}
                </span>
                <span
                  :class="getPriorityColor(task.priority)"
                  class="px-2 py-1 rounded-full text-xs"
                >
                  {{ task.priority }}
                </span>
              </div>
              <div class="flex gap-2">
                <button @click="$emit('edit', task)" class="text-indigo-600 hover:text-indigo-900">
                  <Edit2Icon class="h-4 w-4" />
                </button>
                <button @click="$emit('delete', task.id)" class="text-red-600 hover:text-red-900">
                  <Trash2Icon class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </VueDraggable>
    </div>
  </div>
  <div v-else>
    <p>No data found</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VueDraggableNext as VueDraggable } from 'vue-draggable-next'
import { Edit2Icon, Trash2Icon } from 'lucide-vue-next'

interface Event {
  element: Task
}

const props = defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits(['edit', 'delete', 'update:tasks'])

const columns = [
  { id: 'Pending', title: 'Pending' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
]

const getTasksForColumn = (columnId: string) => {
  return computed(() => props?.tasks?.filter((task) => task.status === columnId))
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800'
    case 'Medium':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
}

const onDragChange = (evt: { moved: Event; added: Event }, columnId: string) => {
  if (evt.added || evt.moved) {
    const updatedTasks = props.tasks.map((task) => {
      if (task.id === evt.added?.element.id || task.id === evt.moved?.element.id) {
        return { ...task, status: columnId }
      }
      return task
    })

    emit('update:tasks', updatedTasks)
  }
}
</script>
