<script lang="ts" setup>
import { computed } from 'vue'
// import Table from '@/components/ui/Table.vue'
// import TableBody from '@/components/ui/TableBody.vue'
// import TableCell from '@/components/ui/TableCell.vue'
// import TableHead from '@/components/ui/TableHead.vue'
// import TableHeader from '@/components/ui/TableHeader.vue'
// import TableRow from '@/components/ui/TableRow.vue'

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/data/table.vue";
import Badge from '@/components/misc/bagde.vue'
// import Badge from '@/components/ui/Badge.vue'
import { Edit2Icon, Trash2Icon } from 'lucide-vue-next'
import Button from '@/components/button/button.vue';


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

let tasks = [
  {
    id: 1,
    title: "Redesign website homepage",
    description: "Update the layout and color scheme of the main landing page",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-11-20T12:00:00Z",
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add login and registration functionality to the app",
    status: "Pending",
    priority: "High",
    dueDate: "2024-11-22T15:00:00Z",
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Create comprehensive documentation for the RESTful API",
    status: "Completed",
    priority: "Medium",
    dueDate: "2024-11-18T09:00:00Z",
  },
  {
    id: 4,
    title: "Optimize database queries",
    description: "Improve the performance of slow database queries",
    status: "Pending",
    priority: "Medium",
    dueDate: "2024-11-25T14:00:00Z",
  },
  {
    id: 5,
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment process",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-11-21T11:00:00Z",
  },
]
</script>

<template>
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
      <TableRow v-for="task in tasks" :key="task.id">
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
</template>
