<template>
  <LayoutMeetupForm :title="'Редактирование митапа'">
    <MeetupForm
      v-if="meetup"
      :meetup="meetup"
      :submitText="'Сохранить'"
      @submit="submit"
      @cancel="cancel"
    />

    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </LayoutMeetupForm>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { ref, watch } from 'vue';
  import MeetupForm from '../components/MeetupForm.vue';
  import UiAlert from '../components/UiAlert.vue';
  import UiContainer from '../components/UiContainer.vue';
  import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
  import { getMeetup, putMeetup } from '../api/meetupsApi.js';
  import { useHead } from '@unhead/vue';

  export default {
    name: 'PageEditMeetup',

    components: {
      UiAlert,
      UiContainer,
      MeetupForm,
      LayoutMeetupForm,
    },

    async beforeRouteEnter(to) {
      const result = await getMeetup(+to.params.meetupId);
      if (result.success) {
        return (vm) => {
          vm.setMeetup(result.data);
        };
      } else {
        return { name: 'meetups' };
      }
    },

    props: {
      meetupId: {
        type: Number,
        required: true,
      },
    },

    setup(props) {
      // TODO: <title> "Редактирование митапа | Meetups" == Готово
      // TODO: Добавить LayoutMeetupForm == Готово
      const router = useRouter();

      const meetup = ref(null);
      const error = ref(null);

      useHead({
        title: 'Редактирование митапа | Meetups',
      });

      const fetchMeetup = async () => {
        meetup.value = null;
        error.value = null;

        const result = await getMeetup(props.meetupId);
        if (result.success) {
          meetup.value = result.data;
        } else {
          error.value = result.error.message;
        }
      };

      watch(() => props.meetupId, fetchMeetup);

      // TODO: При сабмите формы редактирования митапа - обновить его через API и перейти на страницу изменённого митапа
      // TODO: При нажатии на "Отмена" вернуться на страницу этого митапа

      // Methods
      const setMeetup = (value) => (meetup.value = value);

      const submit = (value) => {
        console.log(value);
        putMeetup(value);
      };

      const cancel = () => {
        router.push({ name: 'meetup', params: { meetupId: meetup.id } });
      };
      return {
        meetup,
        error,
        setMeetup,
        submit,
        cancel,
      };
    },
  };
</script>

<style scoped></style>
