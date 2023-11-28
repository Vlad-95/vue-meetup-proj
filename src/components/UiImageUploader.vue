<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{
        'image-uploader__preview-loading': state === States.LOADING,
      }"
      :style="state !== States.EMPTY && `--bg-url: url('${imageSrc}')`"
    >
      <span class="image-uploader__text">{{ stateText }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @change="handleFileSelect"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
  // TODO: Task 06-wrappers/05-UiImageUploader = Готово

  import { computed, ref, onBeforeUnmount } from 'vue';

  export default {
    name: 'UiImageUploader',
    inheritAttrs: false,

    props: {
      uploader: {
        type: Function,
      },

      preview: {
        type: String,
      },
    },

    emits: ['upload', 'select', 'error', 'remove'],

    setup(props, { emit }) {
      // templRef
      const input = ref(null);

      // состояния загрузки
      const States = {
        EMPTY: 'EMPTY',
        LOADING: 'LOADING',
        FILLED: 'FILLED',
      };

      // Храним текущее состояние
      // Начальное состояние зависит от того, передан ли preview
      const state = ref(props.preview ? States.FILLED : States.EMPTY);
      const localPreview = ref(null);

      // Computed
      const stateText = computed(() => {
        return {
          [States.EMPTY]: 'Загрузить изображение',
          [States.LOADING]: 'Загрузка...',
          [States.FILLED]: 'Удалить изображение',
        }[state.value];
      });

      const imageSrc = computed(() => {
        // Текущее изображение - либо уже выбранное локальное, либо изначальное превью
        // Для удалённого изображения здесь будет ссылка на preview, но не будет выводиться
        return localPreview.value ?? preview.value;
      });

      onBeforeUnmount(() => {
        // Чистим созданный идентификатор на изображение компонента
        if (localPreview.value) {
          URL.revokeObjectURL(localPreview.value);
        }
      });

      // Methods
      const handleFileSelect = async ($event) => {
        // Достаём файл их события (инпута) и отдаём с событием родителю
        const file = $event.target.files[0];
        emit('select', file);
        // Создаём ссылку на текущий файл для отображения
        localPreview.value = URL.createObjectURL(file);
        // Если нет загрузчика, работа с файлом завершена
        if (!props.uploader) {
          state.value = States.FILLED;
          return;
        }
        // Загружаем файл
        return await upload(file);
      };

      const upload = async (file) => {
        state.value = States.LOADING;
        try {
          const result = await props.uploader(file);
          emit('upload', result);
          state.value = States.FILLED;
        } catch (error) {
          emit('error', error);
          state.value = States.EMPTY;
          // Не забываем сбросить файл в случае не успешной загрузки
          // Иначе нельзя будет выбрать тот же файл
          removeFile();
        }
      };

      const handleClick = ($event) => {
        if (state.value === States.LOADING) {
          // Игнорируем клик во время загрузки
          $event.preventDefault();
        } else if (state.value === States.FILLED) {
          $event.preventDefault();
          removeFile();
          state.value = States.EMPTY;
          emit('remove');
        }
        // Когда ничего не выбрано, клик обрабатывается по умолчанию, открывая диалог выбора файла
      };

      const removeFile = () => {
        // Файл нельзя удалить нормальным Vue-way способом, нужно напрямую менять DOM
        input.value = '';
        localPreview.value = null;
      };

      return {
        input,
        States,
        state,
        localPreview,
        stateText,
        imageSrc,
        handleFileSelect,
        upload,
        handleClick,
      };
    },
  };
</script>

<style scoped>
  /* _image-uploader.css */

  .image-uploader {
  }

  .image-uploader__input {
    opacity: 0;
    height: 0;
  }

  .image-uploader__preview {
    --bg-url: var(--default-cover);
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ),
      var(--bg-url);
    border: 2px solid var(--blue-light);
    border-radius: 8px;
    transition: 0.2s border-color;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 512px;
    height: 228px;
  }

  .image-uploader__text {
    color: var(--white);
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }

  .image-uploader__preview:hover {
    border-color: var(--blue);
  }

  .image-uploader__preview.image-uploader__preview-loading {
    cursor: no-drop;
  }
</style>
