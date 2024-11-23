<script lang="ts" setup>
import { ref, computed } from 'vue'
import { DragDropContext, Droppable, Draggable } from '@dnd-kit/vue'
import { Task } from '../types/Task'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { Edit2Icon, Trash2Icon } from 'lucide-vue-next'

interface Column {
  id: string
  title: string
}

const props = defineProps<{
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onDragEnd: (result: any) => void
}>()

const columns: Column[] = [
  { id: 'Pending', title: 'Pending' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
]

// Utility functions for styling
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500'
    case 'In Progress':
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'High':
      return 'bg-red-500'
    case 'Medium':
      return 'bg-orange-500'
    default:
      return 'bg-blue-500'
  }
}
</script>

<template>
  <DragDropContext @dragend="props.onDragEnd">
    <div class="flex gap-4 overflow-x-auto pb-4">
      <div
        v-for="column in columns"
        :key="column.id"
        class="flex-1 min-w-[300px]"
      >
        <h3 class="font-semibold mb-2">{{ column.title }}</h3>
        <Droppable :id="column.id">
          <template #default="{ setNodeRef, droppableProps, placeholder }">
            <div
              v-bind="droppableProps"
              ref="setNodeRef"
              class="bg-gray-100 p-2 rounded-md min-h-[500px]"
            >
              <Draggable
                v-for="(task, index) in props.tasks.filter(task => task.status === column.id)"
                :key="task.id"
                :id="task.id"
                :index="index"
              >
                <template #default="{ setNodeRef, draggableProps, dragHandleProps }">
                  <Card
                    ref="setNodeRef"
                    v-bind="draggableProps"
                    v-bind="dragHandleProps"
                    class="mb-2"
                  >
                    <CardContent class="p-4">
                      <h4 class="font-medium mb-2">{{ task.title }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ task.description }}</p>
                      <div class="flex justify-between items-center">
                        <div class="flex gap-2">
                          <Badge :class="getStatusColor(task.status)">{{ task.status }}</Badge>
                          <Badge :class="getPriorityColor(task.priority)">{{ task.priority }}</Badge>
                        </div>
                        <div class="flex gap-2">
                          <Button variant="ghost" size="icon" @click="props.onEdit(task)">
                            <Edit2Icon class="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" @click="props.onDelete(task.id)">
                            <Trash2Icon class="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </template>
              </Draggable>
              {{ placeholder }}
            </div>
          </template>
        </Droppable>
      </div>
    </div>
  </DragDropContext>
</template>
