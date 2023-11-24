<template>
  <div class="meetup-cover">
    <h1 class="meetup-cover__title">{{ title }}</h1>
  </div>
</template>

<script>
// TODO: Task 02-components/03-MeetupCover

import { computed } from 'vue';

export default {
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      required: false,
    },

    image: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    // Computed
    const meetupCover = computed(() =>
      props.image ? `url(${props.image})` : 'var(--default-cover)'
    );

    return {
      meetupCover,
    };
  },
};
</script>

<style scoped>
/* _meetup-cover.css */
/* TODO: добавить v-bind в css */

.meetup-cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    v-bind(meetupCover);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
