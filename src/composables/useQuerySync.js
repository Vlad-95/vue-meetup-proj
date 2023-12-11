import { watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export function useQuerySync(filter, view) {
  const router = useRouter();
  const route = useRoute();

  // Функция для обновления адресной строки при изменении фильтров
  const updateFiltersInURL = () => {
    const params = {};

    if (filter.value.date != 'all') {
      params.date = filter.value.date;
    } else {
      delete params.date;
    }

    if (filter.value.participation != 'all') {
      params.participation = filter.value.participation;
    } else {
      delete params.participation;
    }

    if (filter.value.search != '') {
      params.search = filter.value.search;
    } else {
      delete params.search;
    }

    if (view.value != 'list') {
      params.view = view.value;
    } else {
      delete params.view;
    }

    router.replace({ query: params });
  };

  // Функция для обновления фильтров при изменении адресной строки
  const updateFiltersFromURL = () => {
    const { query } = route;

    filter.value.date = query.date || 'all';
    filter.value.participation = query.participation || 'all';
    filter.value.search = query.search || '';

    view.value = query.view || 'list';
  };

  // Следим за изменениями фильтров и обновляем адресную строку
  watch([filter, view], updateFiltersInURL, { deep: true });

  // Синхронизируем фильтры при монтировании компонента
  onMounted(() => {
    updateFiltersFromURL();
  });

  return filter;
}
