<template>
  <UiInput
    :model-value="value"
    :type="type"
    @input="handleInput"
  >
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
  // TODO: Task 06-wrappers/06-UiInputDate = Готово
  import { computed } from 'vue';
  import UiInput from './UiInput.vue';

  export default {
    name: 'UiInputDate',

    components: { UiInput },

    props: {
      modelValue: Number,

      type: {
        type: String,
        default: 'date',
        validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
      },

      step: {
        type: [Number],
      },
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
      // Computed
      const value = computed(() => {
        // No value - empty string
        if (
          typeof props.modelValue === 'undefined' ||
          props.modelValue === null
        ) {
          return '';
        }

        // YYYY-MM-DDTHH:MM:SS.mssZ
        const date = new Date(props.modelValue).toISOString();

        if (props.type === 'date') {
          return date.substring(0, 10); // YYYY-MM-DD
        } else if (props.type === 'datetime-local') {
          return date.substring(0, 16); // YYYY-MM-DDTHH:MM
        } else if (props.type === 'time') {
          return props.step && props.step % 60 !== 0
            ? date.substring(11, 19) // HH:MM:SS
            : date.substring(11, 16); // HH:MM
        }

        return '';
      });

      // Methods
      const handleInput = ($event) => {
        emit(
          'update:modelValue',
          $event.target.value !== '' ? $event.target.valueAsNumber : undefined
        );
      };

      return {
        value,
        handleInput,
      };
    },
  };
</script>
