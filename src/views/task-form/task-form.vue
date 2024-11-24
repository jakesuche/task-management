<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import SelectInput from '@/components/forms/select-input.vue'
import TextInput from '@/components/forms/text-input.vue'
import TextArea from '@/components/forms/text-area.vue'
import Button from '@/components/button/button.vue'
import ModalDialog from '@/components/overlay/dialog.vue'

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'> | Task) => void
  onClose: () => void
  task?: Task | null
  open: boolean
}

const props = defineProps<TaskFormProps>()

const form = reactive({
  title: props.task?.title || '',
  description: props.task?.description || '',
  status: props.task?.status || 'Pending',
  priority: props.task?.priority || 'Medium',
  dueDate: props.task?.dueDate ? new Date(props.task.dueDate).toISOString().split('T')[0] : '',
})

// Watch for changes in the `task` prop and update form data
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.title = newTask.title
      form.description = newTask.description!
      form.status = newTask.status
      form.priority = newTask.priority
      form.dueDate = new Date(newTask.dueDate).toISOString().split('T')[0]
    }
  },
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
  <ModalDialog
    :header="props.task ? 'Edit Task' : 'Add New Task'"
    :open="props.open"
    :confirmButtonText="'Save'"
    customeClass="max-w-[800px]"
  >
    <form @submit="handleSubmit" class="space-y-4">
      <TextInput id="title" v-model="form.title" label="Title" />
      <TextArea label="Description" id="description" v-model="form.description" required />
      <SelectInput
      v-model="form.status"
        :options="[
          { label: 'Pending', value: 'Pending' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: 'Completed' },
        ]"
        label="Select status"
      />
      <SelectInput
      v-model="form.priority"
        :options="[
          { label: 'Low', value: 'Low' },
          { label: 'Medium', value: 'Medium' },
          { label: 'High', value: 'High' },
        ]"
        label="Select priority"
      />
      <TextInput type="date" id="title" v-model="form.dueDate" label="Due Date" />
      <Button type="submit" class="w-full">
        {{ props.task ? 'Update Task' : 'Add Task' }}
      </Button>
    </form>
  </ModalDialog>
</template>
