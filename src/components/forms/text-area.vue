<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    ></textarea>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TextAreaComponent',
  props: {
    label: {
      type: String,
      default: 'Your message',
    },
    id: {
      type: String,
      default: 'message',
    },
    rows: {
      type: Number,
      default: 4,
    },
    placeholder: {
      type: String,
      default: 'Write your thoughts here...',
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const onInput = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
      emit('update:modelValue', target.value);
    };

    return {
      value: modelValue,
      onInput,
    };
  },
});
</script>


