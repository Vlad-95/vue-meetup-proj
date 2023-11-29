<template>
  <LayoutMeetupForm :title="'Создание митапа'">
    <MeetupForm
      :meetup="meetup"
      :submitText="'Создать'"
      @submit="submit"
      @cancel="cancel"
    />
  </LayoutMeetupForm>
</template>

<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import MeetupForm from '../components/MeetupForm.vue';
  import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
  import { createMeetup } from '../services/meetupService.js';
  import { useHead } from '@unhead/vue';
  import { postMeetup } from '../api/meetupsApi';

  export default {
    name: 'PageCreateMeetup',

    components: {
      MeetupForm,
      LayoutMeetupForm,
    },

    setup() {
      // TODO: title "Создание митапа | Meetups" == Готово
      // TODO: Добавить LayoutMeetupForm = Готово
      // TODO: При сабмите формы создания митапа - добавить его через API и перейти на страницу созданного митапа
      // TODO: При нажатии на "Отмена" вернуться на главную страницу = Готово

      const router = useRouter();

      useHead({
        title: 'Создание митапа | Meetups',
      });
      const meetup = ref(createMeetup());

      // Methods
      const submit = (value) => {
        console.log(value);
        postMeetup(value);
      };

      const cancel = () => {
        router.push({ name: 'index' });
      };

      return {
        meetup,
        submit,
        cancel,
      };
    },
  };
</script>

<style scoped></style>
