<template>
  <fieldset class="agenda-item-form">
    <button
      type="button"
      @click="$emit('remove')"
      class="agenda-item-form__remove-button"
    >
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown
        title="Тип"
        v-model="localAgendaItem.type"
        :options="agendaItemTypeOptions"
        name="type"
      />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput
            type="time"
            v-model="localAgendaItem.startsAt"
            placeholder="00:00"
            name="startsAt"
            @input="updateTime($event.target.value)"
          />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput
            type="time"
            v-model="localAgendaItem.endsAt"
            placeholder="00:00"
            name="endsAt"
          />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup
      v-for="item in formLayout"
      :label="item.label"
    >
      <component
        :is="item.component"
        v-bind="{ ...item.props }"
        v-model="localAgendaItem[item.type]"
      ></component>
    </UiFormGroup>
  </fieldset>
</template>

<script>
  // TODO: Task 07-forms/04-GeneratedForm = Готово
  import UiIcon from './UiIcon.vue';
  import UiFormGroup from './UiFormGroup.vue';
  import UiInput from './UiInput.vue';
  import UiDropdown from './UiDropdown.vue';
  import { reactive, watch } from 'vue';
  import { computed } from '@vue/reactivity';

  const agendaItemTypeIcons = {
    registration: 'key',
    opening: 'cal-sm',
    talk: 'tv',
    break: 'clock',
    coffee: 'coffee',
    closing: 'key',
    afterparty: 'cal-sm',
    other: 'cal-sm',
  };

  const agendaItemDefaultTitles = {
    registration: 'Регистрация',
    opening: 'Открытие',
    break: 'Перерыв',
    coffee: 'Coffee Break',
    closing: 'Закрытие',
    afterparty: 'Afterparty',
    talk: 'Доклад',
    other: 'Другое',
  };

  const talkLanguageOptions = [
    { value: null, text: 'Не указано' },
    { value: 'RU', text: 'RU' },
    { value: 'EN', text: 'EN' },
  ];

  /**
   * @typedef FormItemSchema
   * @property {string} label
   * @property {string|object} component
   * @property {object} props
   */
  /** @typedef {string} AgendaItemField */
  /** @typedef {string} AgendaItemType */
  /** @typedef {Object.<AgendaItemType, FormItemSchema>} FormSchema */

  /** @type FormSchema */
  const commonAgendaItemFormSchema = {
    title: {
      label: 'Нестандартный текст (необязательно)',
      component: 'ui-input',
      props: {
        name: 'title',
      },
    },
  };

  /** @type {Object.<AgendaItemField, FormSchema>} */
  const agendaItemFormSchemas = {
    registration: commonAgendaItemFormSchema,
    opening: commonAgendaItemFormSchema,
    talk: {
      title: {
        label: 'Тема',
        component: 'ui-input',
        props: {
          name: 'title',
        },
      },
      speaker: {
        label: 'Докладчик',
        component: 'ui-input',
        props: {
          name: 'speaker',
        },
      },
      description: {
        label: 'Описание',
        component: 'ui-input',
        props: {
          multiline: true,
          name: 'description',
        },
      },
      language: {
        label: 'Язык',
        component: 'ui-dropdown',
        props: {
          options: talkLanguageOptions,
          title: 'Язык',
          name: 'language',
        },
      },
    },
    break: commonAgendaItemFormSchema,
    coffee: commonAgendaItemFormSchema,
    closing: commonAgendaItemFormSchema,
    afterparty: commonAgendaItemFormSchema,
    other: {
      title: {
        label: 'Заголовок',
        component: 'ui-input',
        props: {
          name: 'title',
        },
      },
      description: {
        label: 'Описание',
        component: 'ui-input',
        props: {
          multiline: true,
          name: 'description',
        },
      },
    },
  };

  export default {
    name: 'MeetupAgendaItemForm',

    components: {
      UiIcon,
      UiFormGroup,
      UiInput,
      UiDropdown,
    },

    props: {
      agendaItem: {
        type: Object,
        required: true,
      },
    },

    emits: ['update:agendaItem', 'remove'],

    setup(props, { emit }) {
      // non-reactive variables
      const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(
        ([type, title]) => ({
          value: type,
          text: title,
          icon: agendaItemTypeIcons[type],
        })
      );

      // State
      const localAgendaItem = reactive({ ...props.agendaItem });

      // Computed
      const formLayout = computed(() => {
        let type = localAgendaItem.type;

        let fields = Object.entries(agendaItemFormSchemas[type]).map(
          ([type, info]) => ({
            type,
            ...info,
          })
        );

        return fields;
      });

      const diffTime = computed(() => {
        let startsAtHours = parseInt(localAgendaItem.startsAt.split(':')[0]);
        let endsAtHours = parseInt(localAgendaItem.endsAt.split(':')[0]);

        return endsAtHours - startsAtHours;
      });

      // Methods
      const updateTime = (value) => {
        let valueHours = parseInt(value.split(':')[0]);
        let valueMin = value.split(':')[1];
        let summaryHours = valueHours + diffTime.value;
        let resultHours;
        if (summaryHours >= 24) {
          let excess = summaryHours - 24;
          resultHours = 0 + excess;
        } else {
          resultHours = summaryHours;
        }

        let formatedResultHours =
          resultHours < 10 ? `0${resultHours}` : resultHours;

        let resultTime = `${formatedResultHours}:${valueMin}`;

        localAgendaItem.endsAt = resultTime;
      };

      watch(
        () => localAgendaItem,
        () => {
          console.log(localAgendaItem);
          emit('update:agendaItem', { ...localAgendaItem });
        },
        { deep: true }
      );

      return {
        agendaItemTypeOptions,
        localAgendaItem,
        formLayout,
        diffTime,
        updateTime,
      };
    },
  };
</script>

<style scoped>
  /* _agenda-item-form.css */

  .agenda-item-form {
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    position: relative;
    padding: 20px 10% 0 16px;
  }

  .agenda-item-form__remove-button {
    position: absolute;
    top: 4px;
    right: 0;
    box-shadow: none;
    border: none;
    background-color: transparent;
    outline: none;
    padding: 4px;
    cursor: pointer;
    transition: 0.2s opacity;
  }

  .agenda-item-form__remove-button:hover {
    opacity: 0.6;
  }

  .agenda-item-form__row {
    display: flex;
    flex-direction: column;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 16px;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }

  @media all and (min-width: 992px) {
    .agenda-item-form {
      padding: 28px 25% 4px 24px;
    }

    .agenda-item-form__remove-button {
      top: 20px;
      right: 20px;
    }

    .agenda-item-form__row {
      flex-direction: row;
      justify-content: space-between;
      margin: 0 -12px;
    }

    .agenda-item-form__col {
      flex: 1 1 auto;
      padding: 0 12px;
    }

    .agenda-item-form__col + .agenda-item-form__col {
      margin-top: 0;
    }

    .agenda-item-form__col:first-child {
      margin-left: 0;
    }
  }
</style>
