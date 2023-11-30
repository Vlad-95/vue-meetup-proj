<template>
  <LayoutAuth :title="'Вход'">
    <UiForm @submit.prevent="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput
          v-model="email"
          name="email"
          type="email"
          placeholder="demo@email"
          required
        />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput
          v-model="password"
          name="password"
          type="password"
          placeholder="password"
          required
        />
      </UiFormGroup>

      <template #buttons>
        <UiButton
          variant="primary"
          type="submit"
          block
          >Войти</UiButton
        >
      </template>

      <template #append>
        Нет аккаунта?
        <UiLink
          :to="{ name: 'register' }"
          class="link"
          >Зарегистрируйтесь</UiLink
        >
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
  // TODO: Task 05-vue-router/01-AuthPages
  // TODO: Добавить именованные маршруты
  // import { useAuthStore } from '../stores/useAuthStore';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useHead } from '@unhead/vue';
  import { useToaster } from '../plugins/toaster';
  import { useAuthStore } from '../stores/useAuthStore';

  import UiFormGroup from '../components/UiFormGroup.vue';
  import UiLink from '../components/UiLink.vue';
  import UiInput from '../components/UiInput.vue';
  import UiButton from '../components/UiButton.vue';
  import UiForm from '../components/UiForm.vue';
  import LayoutAuth from '../components/LayoutAuth.vue';

  export default {
    name: 'PageLogin',

    components: {
      UiForm,
      UiButton,
      UiInput,
      UiLink,
      UiFormGroup,
      LayoutAuth,
    },

    setup() {
      // TODO: <title> "Вход | Meetups" == Готово
      // TODO: Добавить LayoutAuth == Готово
      /*
      TODO: Добавить обработчик сабмита
            - В случае успешной аутентификации:
              - Перейти на главную страницу или from (Task 05-vue-router/01-AuthPages)
              - Вывести тост "Авторизация прошла успешно"
            - В случае неуспешной аутентификации:
              - Вывести тост "Неверные учётные данные..."
     */
      useHead({
        title: 'Вход | Meetups',
      });

      const router = useRouter();

      const email = ref('demo@email');
      const password = ref('password');

      // Methods
      const handleSubmit = () => {
        const authStore = useAuthStore();
        const result = authStore.login(email.value, password.value);

        console.log(result);
        // try {
        //   console.log(1);
        //   login(email.value, password.value);
        //   // router.push({ name: 'index' });
        // } catch (e) {
        //   console.log(e);
        //   // useToaster();
        // }
      };

      return {
        email,
        password,
        handleSubmit,
      };
    },
  };
</script>

<style scoped></style>
