<template>
  <LayoutAuth :title="'Вход | Meetups'">
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
        <UiButton variant="primary" type="submit" block>Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <UiLink to="/register" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
// TODO: Task 05-vue-router/01-AuthPages
// TODO: Добавить именованные маршруты
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';

import { ref } from 'vue';
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
    // TODO: <title> "Вход | Meetups"
    // TODO: Добавить LayoutAuth

    /*
      TODO: Добавить обработчик сабмита
            - В случае успешной аутентификации:
              - Перейти на главную страницу или from (Task 05-vue-router/01-AuthPages)
              - Вывести тост "Авторизация прошла успешно"
            - В случае неуспешной аутентификации:
              - Вывести тост "Неверные учётные данные..."
     */
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('demo@email');
    const password = ref('password');

    // Methods
    const handleSubmit = async () => {
      try {
        await authStore.login(email.value, password.value);
        router.push({ name: 'index' });
      } catch (e) {
        console.log(e);
      }
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
