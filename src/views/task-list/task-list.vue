<script lang="ts" setup>

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/data/table'
import Badge from '@/components/misc/bagde.vue'
// import Badge from '@/components/ui/Badge.vue'
import { Edit2Icon, Trash2Icon } from 'lucide-vue-next'
import Button from '@/components/button/button.vue'



// Props definition
const props = defineProps<{
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}>()

// Utility functions for badge colors
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
  <div v-if="tasks.length > 0">
    <Table>
    <!-- Table Header -->

    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Priority</TableHead>
        <TableHead>Due Date</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>

    <!-- Table Body -->
    <TableBody>
      <TableRow v-for="task in props.tasks" :key="task?.id">
        <TableCell class="font-medium">{{ task.title }}</TableCell>
        <TableCell>{{ task.description }}</TableCell>
        <TableCell>
          <Badge :class="getStatusColor(task.status)">{{ task.status }}</Badge>
        </TableCell>
        <TableCell>
          <Badge :class="getPriorityColor(task.priority)">{{ task.priority }}</Badge>
        </TableCell>
        <TableCell>{{ new Date(task.dueDate).toLocaleDateString() }}</TableCell>
        <TableCell>
          <Button variant="ghost" size="icon" @click="props.onEdit(task)">
            <Edit2Icon class="h-4 w-4" />
          </Button>

             <Button variant="ghost" size="icon" @click="props.onDelete(task.id)">
                <Trash2Icon class="h-4 w-4" />
              </Button>
        </TableCell>
      </TableRow>
    </TableBody>

  </Table>
  </div>
  <div v-else>
    <p>No data found</p>
  </div>

</template>
