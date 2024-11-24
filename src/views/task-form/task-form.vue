<script lang="ts" setup>
import { watch, reactive } from 'vue'
import SelectInput from '@/components/forms/select-input.vue'
import TextInput from '@/components/forms/text-input.vue'
import TextArea from '@/components/forms/text-area.vue'
import Button from '@/components/button/button.vue'
import ModalDialog from '@/components/overlay/dialog.vue'
import {  useField, useForm } from "vee-validate";
import { initialTask, TaskSchema, type TaskSchemaProps } from '@/schema/task'
import { generateRandomId } from '@/util/common'

interface TaskFormProps {
  onClose: () => void
  task?: Task | null
  open: boolean
}
const props = defineProps<TaskFormProps>()


const emits = defineEmits(['submit'])
const {handleSubmit,errors, values} = useForm<TaskSchemaProps>({
  validationSchema:TaskSchema,
  initialValues:initialTask
})


const { value: title } = useField<string>('title');
const { value: description } = useField<string>("description");
const { value: status } = useField<string>("status");
const { value: priority } = useField<string>("priority");
const { value: dueDate } = useField<string>("dueDate");




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

const onSubmit = handleSubmit((value)=> {
  value.id = generateRandomId().toString()
  emits('submit', value)
})
</script>

<template>
  <ModalDialog
    :header="props.task ? 'Edit Task' : 'Add New Task'"
    :open="props.open"
    :confirmButtonText="'Save'"
    customeClass="max-w-[800px]"
  >
    <form @submit="onSubmit" class="space-y-4">
      <TextInput :errorText="errors.title" id="title" v-model="title" label="Title" />
      <TextArea :errorText="errors.description" label="Description" id="description" v-model="description" required />
      <SelectInput
      :errorText="errors.status"
      v-model="status"
        :options="[
          { label: 'Pending', value: 'Pending' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: 'Completed' },
        ]"
        label="Select status"
      />
      <SelectInput
      :errorText="errors.priority"
      v-model="priority"
        :options="[
          { label: 'Low', value: 'Low' },
          { label: 'Medium', value: 'Medium' },
          { label: 'High', value: 'High' },
        ]"
        label="Select priority"
      />
      <TextInput :errorText="errors.dueDate" type="date" id="title" v-model="dueDate" label="Due Date" />
      <Button type="submit" class="w-full">
        {{ props.task ? 'Update Task' : 'Add Task' }}
      </Button>
    </form>
  </ModalDialog>
</template>
