<template>
  <UiCalendarView v-slot="{ timestamp }">
    <UiCalendarEvent
      v-for="meetup in meetupsByDate[timestamp]"
      :key="meetup.id"
      tag="router-link"
      :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      >{{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script>
// TODO: Task 04-vue-cli/04-MeetupsCalendar + 10-slots/03-UiCalendarView
import { computed } from 'vue';
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarView,
    UiCalendarEvent,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    // Computed
    const meetupsByDate = computed(() => {
      const result = {};
      for (const meetup of props.meetups) {
        if (!result[meetup.date]) {
          result[meetup.date] = [meetup];
        } else {
          result[meetup.date].push(meetup);
        }
      }

      return result;
    });

    return {
      meetupsByDate,
    };
  },
};
</script>

<style scoped></style>
