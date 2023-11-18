<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script>
import { provide, computed } from 'vue';

export default {
  name: 'UiButtonGroup',

  props: {
    modelValue: {
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // Methods
    const setModelValue = (value) => {
      emit('update:modelValue', value);
    };

    // Provide
    provide('modelValue', {
      modelValue: computed(() => props.modelValue),
      setModelValue,
    });

    return {
      setModelValue,
    };
  },
};
</script>

<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
