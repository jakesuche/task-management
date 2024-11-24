<template>
  <div class="space-y-6">
    <!-- Title Section -->
    <div>
      <div v-if="isEditingTitle" class="flex items-center gap-2">
        <TextInput v-model="editedTitle" class="text-2xl font-bold" autoFocus />
        <Button @click="handleTitleSave">Save</Button>
      </div>
      <h2
        v-else
        class="text-2xl font-bold flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
        @click="isEditingTitle = true"
      >
        {{ task.title }}
        <PencilIcon class="h-4 w-4 text-gray-500" />
      </h2>

      <!-- Description Section -->
      <div v-if="isEditingDescription" class="mt-2 flex items-start gap-2">
        <Textarea v-model="editedDescription" class="flex-grow" autoFocus />
        <Button @click="handleDescriptionSave">Save</Button>
      </div>
      <p
        v-else
        class="text-gray-500 mt-2 cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
        @click="isEditingDescription = true"
      >
        {{ task.description }}
        <PencilIcon class="h-4 w-4 text-gray-500" />
      </p>
    </div>

    <!-- Status and Priority Section -->
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <SelectInput
          v-model="editedStatus"
          :options="[
            { label: 'Pending', value: 'Pending' },
            { label: 'In Progress', value: 'In Progress' },
            { label: 'Completed', value: 'Completed' },
          ]"
          label="Select status"
        />
      </div>
      <div class="flex items-center gap-2">
        <SelectInput
          v-model="editedPriority"
          :options="[
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
            { label: 'High', value: 'High' },
          ]"
          label="Select priority"
        />
      </div>
    </div>

    <!-- Due Date Section -->
    <div class="grid grid-cols-2 gap-4">
      <div class="flex items-center gap-2">
        <TextInput v-model="(editedDueDate as unknown as string)" type="date" />
      </div>
      <div v-if="task.assignee">
        <div class="flex items-center gap-2">
          <UserIcon class="h-4 w-4 text-gray-500" />
          <Avartar :name="task.assignee.name[0]" class="h-8 w-8"></Avartar>
          <span class="text-sm">{{ task.assignee.name }}</span>
        </div>
      </div>
    </div>

    <!-- Subtasks Section -->
    <Separator />
    <div>
      <div class="flex items-center gap-2 mb-4">
        <CheckSquareIcon class="h-4 w-4" />
        <h3 class="font-semibold">
          Subtasks ({{ completedSubTasksCount }}/{{ task.subTasks?.length || 0 }})
        </h3>
      </div>
      <div class="space-y-3">
        <div v-for="subtask in task.subTasks || []" :key="subtask.id" class="flex items-center gap-3">
          <Checkbox v-model="subtask.completed" />
          <span :class="{ 'line-through text-gray-500': subtask.completed }">
            {{ subtask.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Labels Section -->
    <Separator />
    <div>
      <div class="flex items-center gap-2 mb-4">
        <TagIcon class="h-4 w-4" />
        <h3 class="font-semibold">Labels</h3>
      </div>
      <div class="flex flex-wrap gap-2">
        <Badge v-for="label in task.labels" :key="label" variant="outline">
          {{ label }}
        </Badge>
      </div>
    </div>

    <!-- Attachments Section -->
    <Separator />
    <div v-if="task.attachments && task.attachments.length > 0">
      <div class="flex items-center gap-2 mb-4">
        <PaperclipIcon class="h-4 w-4" />
        <h3 class="font-semibold">Attachments</h3>
      </div>
      <div class="space-y-2">
        <div
          v-for="attachment in task.attachments"
          :key="attachment.name"
          class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          <PaperclipIcon class="h-4 w-4 text-gray-500" />
          <a :href="attachment.url" class="text-sm text-blue-600 hover:underline">
            {{ attachment.name }}
          </a>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <Separator />
    <div>
      <div class="flex items-center gap-2 mb-4">
        <MessageSquareIcon class="h-4 w-4" />
        <h3 class="font-semibold">Comments</h3>
      </div>
      <div class="space-y-4">
        <div v-for="comment in task.comments" :key="comment.id" class="flex gap-3">
          <Avartar :name="comment.authorName[0]" class="h-8 w-8"></Avartar>
          <div class="flex-1">
            <div class="bg-gray-50 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-medium">{{ comment.authorName }}</span>
                <span class="text-sm text-gray-500">{{ formatDate(new Date(comment.createdAt)) }}</span>
              </div>
              <p class="text-sm">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <Avartar name="uc" class="h-8 w-8"></Avartar>
          <div class="flex-1 space-y-2">
            <TextArea v-model="newComment" placeholder="Add a comment..." />
            <Button :disabled="!newComment.trim()">Add Comment</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType } from 'vue'
import SelectInput from '@/components/forms/select-input.vue'
import Button from '@/components/button/button.vue'
import TextInput from '@/components/forms/text-input.vue'
import Avartar from '@/components/media/avartar.vue'
import TextArea from '@/components/forms/text-area.vue'


import {
  PencilIcon,
  CalendarIcon,
  CheckSquareIcon,
  TagIcon,
  PaperclipIcon,
  MessageSquareIcon,
  UserIcon,
} from 'lucide-vue-next'


const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  onUpdate: {
    type: Function as PropType<(updatedTask: Task) => void>,
    required: true,
  },
})

const newComment = ref('')
const isEditingTitle = ref(false)
const isEditingDescription = ref(false)
const editedTitle = ref(props.task.title)
const editedDescription = ref(props.task.description)
const editedDueDate = ref<Date | undefined>(props.task.dueDate ? new Date(props.task.dueDate) : undefined)
const editedStatus = ref<Status>(props.task.status)
const editedPriority = ref<Priority>(props.task.priority)

const handleTitleSave = () => {
  props.onUpdate({ ...props.task, title: editedTitle.value })
  isEditingTitle.value = false
}

const handleDescriptionSave = () => {
  props.onUpdate({ ...props.task, description: editedDescription.value })
  isEditingDescription.value = false
}

const handleDateChange = (date: Date | undefined) => {
  editedDueDate.value = date
  if (date) {
    props.onUpdate({ ...props.task, dueDate: date.toISOString() })
  }
}

const handleStatusChange = (status: Status) => {
  editedStatus.value = status
  props.onUpdate({ ...props.task, status })
}

const handlePriorityChange = (priority: Priority) => {
  editedPriority.value = priority
  props.onUpdate({ ...props.task, priority })
}

const completedSubTasksCount = props?.task?.subTasks?.filter((st) => st.completed).length

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
</script>

<style scoped>
/* Add styles if necessary */
</style>
