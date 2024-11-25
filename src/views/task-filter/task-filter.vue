<script lang="ts" setup>
import { ref } from 'vue'
import Button from '@/components/button/button.vue'
import SelectInput from '@/components/forms/select-input.vue'

const emit = defineEmits(['filter'])

// Reactive State
const status = ref<string>('all')
const priority = ref<string>('all')
const sortBy = ref<string>('none')

// Emit the filter values to parent
const handleFilter = () => {
  emit(
    'filter',
    status.value === 'all' ? '' : status.value,
    priority.value === 'all' ? '' : priority.value,
    sortBy.value === 'none' ? '' : sortBy.value,
  )
}
</script>

<template>
  <div class="flex flex-wrap gap-4 items-end">
    <!-- Status Filter -->
    <div>
      <SelectInput
        v-model="status"
        label="Status"
        class="min-w-[160px]"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Pending', value: 'Pending' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: 'Completed' },
        ]"
      />
    </div>

    <!-- Priority Filter -->
    <div>
      <SelectInput
        v-model="priority"
        class="min-w-[160px]"
        label="Priority"
        :options="[
          { label: 'All', value: 'all' },
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ]"
      />
    </div>

    <!-- Sort By Filter -->
    <div>
      <SelectInput
        v-model="sortBy"
        :options="[
          { label: 'None', value: 'none' },
          { label: 'Due Date (Ascending) ', value: 'dueDate' },
          { label: 'Due Date (Descending)', value: 'dueDateDesc ' },
        ]"
        class="min-w-[160px]"
        label="Sort By"
      />
    </div>

    <!-- Apply Filters Button -->
    <Button variant="solid" @click="handleFilter">Apply Filters</Button>
  </div>
</template>
