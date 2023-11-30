<template>
  <div class="toasts">
    <template v-for="item in toasts">
      <div
        class="toast"
        :class="item.type === 'success' ? 'toast_success' : 'toast_error'"
      >
        <!-- <UiIcon
          class="toast__icon"
          :icon="item.type === 'success' ? 'check-circle' : 'alert-circle'"
        /> -->
        <span>{{ item.message }}</span>
      </div>
    </template>
  </div>
</template>

<script>
  // TODO: Task 04-vue-router/02-TheToaster
  import { ref } from 'vue';
  // import { UiIcon } from '../../components/UiIcon.vue';

  export default {
    name: 'TheToaster',

    components: {
      // UiIcon,
    },

    setup() {
      // State
      const toasts = ref([]);

      // Methods
      const success = (message) => {
        toasts.push({ type: 'success', message });

        setTimeout(() => {
          toasts.splice(0, 1);
        }, 5000);
      };

      const error = (message) => {
        toasts.push({ type: 'error', message });

        setTimeout(() => {
          toasts.splice(0, 1);
        }, 5000);
      };

      return {
        toasts,
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
