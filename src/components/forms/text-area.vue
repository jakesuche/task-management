<template>
  <div>
    <label :for="id" class="mb-2.5 block text-surface-700 font-medium text-xs">{{ label }}</label>
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      :class="errorText && 'border-red-500'"
      class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
    ></textarea>
    <Transition name="slide-fade">
      <span v-if="errorText" class="text-xs text-red-600">
        {{ errorText }}
      </span>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, type PropType } from 'vue';

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
    errorText: String,
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


