<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select.vue'
import { XIcon } from 'lucide-vue-next'
import { Task } from '../types/Task'

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'> | Task) => void
  onClose: () => void
  task?: Task | null
}

const props = defineProps<TaskFormProps>()

const form = reactive({
  title: props.task?.title || '',
  description: props.task?.description || '',
  status: props.task?.status || 'Pending',
  priority: props.task?.priority || 'Medium',
  dueDate: props.task?.dueDate
    ? new Date(props.task.dueDate).toISOString().split('T')[0]
    : '',
})

// Watch for changes in the `task` prop and update form data
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.title = newTask.title
      form.description = newTask.description
      form.status = newTask.status
      form.priority = newTask.priority
      form.dueDate = new Date(newTask.dueDate).toISOString().split('T')[0]
    }
  }
)

// Handle form submission
const handleSubmit = (e: Event) => {
  e.preventDefault()
  const newTask = {
    ...(props.task && { id: props.task.id }),
    title: form.title,
    description: form.description,
    status: form.status,
    priority: form.priority,
    dueDate: new Date(form.dueDate).toISOString(),
  }
  props.onSubmit(newTask)
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">
          {{ props.task ? 'Edit Task' : 'Add New Task' }}
        </h2>
        <Button variant="ghost" size="icon" @click="props.onClose">
          <XIcon class="h-6 w-6" />
        </Button>
      </div>

      <!-- Form -->
      <form @submit="handleSubmit" class="space-y-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            id="title"
            v-model="form.title"
            required
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            v-model="form.description"
            required
          />
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select v-model="form.status">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <Select v-model="form.priority">
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Due Date -->
        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <Input
            id="dueDate"
            type="date"
            v-model="form.dueDate"
            required
          />
        </div>

        <!-- Submit Button -->
        <Button type="submit" class="w-full">
          {{ props.task ? 'Update Task' : 'Add Task' }}
        </Button>
      </form>
    </div>
  </div>
</template>
