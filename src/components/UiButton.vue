<template>
  <component
    :is="tag"
    :type="buttonFlag"
    class="button"
    :class="[{ button_block: block }, variantClass]"
  >
    <slot />
  </component>
</template>

<script>
// TODO: Task 06-wrappers/02-UiButton
import { computed } from 'vue';

export default {
  name: 'UiButton',

  props: {
    tag: {
      type: [String, Object, Function],
      default: 'button',
    },

    variant: {
      type: String,
      default: 'secondary',
    },

    block: {
      type: Boolean,
    },
  },

  setup(props) {
    // Computed
    const buttonFlag = computed(() => {
      if (props.tag == 'button') {
        return 'button';
      }
    });
    const variantClass = computed(() => `button_${props.variant}`);

    return { buttonFlag, variantClass };
  },
};
</script>

<style scoped>
/* _button.css */
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
