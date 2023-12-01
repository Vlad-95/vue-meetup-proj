<template>
  <div class="toasts">
    <div
      v-if="message"
      class="toast"
      :class="type === 'success' ? 'toast_success' : 'toast_error'"
    >
      <UiIcon
        class="toast__icon"
        :icon="type === 'success' ? 'check-circle' : 'alert-circle'"
      />
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
// TODO: Task 04-vue-router/02-TheToaster
import { ref } from 'vue';
import UiIcon from '../../components/UiIcon.vue';

export default {
  name: 'TheToaster',

  components: {
    UiIcon,
  },

  setup() {
    // State
    const message = ref(null);
    const type = ref(null);

    // Methods
    const success = (value) => {
      message.value = value;
      type.value = 'success';

      setTimeout(() => {
        message.value = null;
        type.value = null;
      }, 2000);
    };

    const error = (value) => {
      message.value = value;
      type.value = 'error';

      setTimeout(() => {
        message.value = null;
        type.value = null;
      }, 2000);
    };

    return {
      message,
      type,
      success,
      error,
    };
  },
};
</script>

<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
