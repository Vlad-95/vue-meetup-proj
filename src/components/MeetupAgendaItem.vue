<template>
  <div class="agenda-item">
    <div class="agenda-item__col">
      <UiIcon :icon="agendaIcon" />
    </div>
    <div class="agenda-item__col">
      {{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}
    </div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
      <p
        v-if="agendaItem.type === 'talk'"
        class="agenda-item__talk"
      >
        <span>{{ agendaItem.speaker }}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang">{{ agendaItem.language }}</span>
      </p>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<script>
  import {
    agendaItemDefaultTitles,
    agendaItemIcons,
  } from '../services/meetupService';
  import UiIcon from './UiIcon.vue';
  // TODO: Task 02-components/05-MeetupAgenda == Готово
  // TODO: add <UiIcon> component == Готово

  export default {
    name: 'MeetupAgendaItem',

    components: {
      UiIcon,
    },

    props: {
      agendaItem: {
        type: Object,
        required: true,
      },
    },

    setup(props) {
      const iconsLib = agendaItemIcons;
      const defaultTitles = agendaItemDefaultTitles;

      // Computed
      const agendaIcon = iconsLib[props.agendaItem.type];
      const agendaTitle = defaultTitles[props.agendaItem.type];

      return {
        agendaIcon,
        agendaTitle,
      };
    },
  };
</script>

<style scoped>
  /* _agenda-item.css */
  .agenda-item {
    padding: 24px 0;
    display: flex;
    flex-direction: row;
    font-size: 18px;
    line-height: 28px;
  }

  .agenda-item__col:nth-child(1) {
    flex: 1 0 48px;
    max-width: 48px;
  }

  .agenda-item__col:nth-child(2) {
    flex: 115px;
    max-width: 115px;
    color: var(--blue);
    white-space: nowrap;
  }

  .agenda-item__col:nth-child(3) {
    flex: 1 0 calc(100% - 48 - 115);
    max-width: calc(100% - 48 - 115);
    padding-left: 24px;
  }

  .agenda-item__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
  }

  .agenda-item__lang {
    font-style: italic;
  }

  .agenda-item__dot::before {
    content: '•';
    color: var(--grey);
    padding: 0 1ch;
  }

  .agenda-item__talk {
    margin-top: 16px;
    margin-bottom: 0;
  }

  @media all and (min-width: 992px) {
    .agenda-item {
      padding: 40px 0;
    }
  }
</style>
