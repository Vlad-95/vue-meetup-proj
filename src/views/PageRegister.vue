<template>
  <LayoutAuth :title="'Регистрация'">
    <UiForm @submit.prevent="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required />
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput
          v-model="password"
          name="password"
          type="password"
          required
          minlength="6"
        />
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required
          >Я согласен с условиями</UiCheckbox
        >
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{ name: 'login' }">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script>
// TODO: Task 05-vue-router/01-AuthPages == Готово
// TODO: Добавить именованные маршруты
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useHead } from '@unhead/vue';
import { useToaster } from '../plugins/toaster';
import { useRouter } from 'vue-router';

import { registerUser } from '../api/authApi';

export default {
  name: 'PageRegister',

  components: {
    UiForm,
    UiButton,
    UiLink,
    UiCheckbox,
    UiInput,
    UiFormGroup,
    LayoutAuth,
  },

  setup() {
    // TODO: <title> "Регистрация | Meetups" == Готово
    // TODO: Добавить LayoutAuth == Готово
    // TODO: Вывести тост с текстом ошибки
    /*
        TODO: Добавить обработчик сабмита == Готово
              - В случае успешной регистрации:
                - Перейти на страницу входа (Task 05-vue-router/01-AuthPages)
                - Вывести тост "Регистрация выполнена успешно"
              - В случае неуспешной регистрации:
                - Вывести тост с текстом ошибки с API
       */
    useHead({
      title: 'Регистрация | Meetups',
    });
    const router = useRouter();
    const toaster = useToaster();

    // State
    const email = ref('test@email.ru');
    const fullname = ref('Тест');
    const password = ref('qwerty');
    const password2 = ref('qwerty');
    const agree = ref(true);

    // Methods
    const validate = () => {
      if (password.value !== password2.value) {
        return 'Пароли не совпадают';
      }
      if (!agree.value) {
        return 'Требуется согласится с условиями';
      }
    };

    const handleSubmit = async () => {
      const validationError = validate();
      if (validationError) {
        return;
      }

      const preparedData = {
        fullname: fullname.value,
        email: email.value,
        password: password.value,
      };
      const result = await registerUser(preparedData);

      if (result.success) {
        toaster.success('Регистрация выполнена успешно');
        router.push({ name: 'index' });
      } else {
        toaster.error(result.error.message);
      }
    };

    return {
      email,
      fullname,
      password,
      password2,
      agree,
      handleSubmit,
    };
  },
};
</script>

<style scoped></style>
