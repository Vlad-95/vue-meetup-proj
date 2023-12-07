import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useQuerySync() {
  const router = useRouter();
  const route = useRoute();
  const queryStringView = ref(null);
  const queryStringFilter = ref(null);
  const resultQuery = ref(null);

  // получаем query из адресной строки
  // console.log(route.query);

  watch(
    queryStringFilter,
    () => {
      queryStringUpdate();
    },
    { deep: true }
  );
  // console.log(queryStringFilter.value);
  // const changeQuery = computed(() => {});

  // watch(queryStringView, () => {
  //   console.log(queryString);
  // });

  const queryStringUpdate = () => {
    const queryDate = queryStringFilter.value.date;
    const queryParticipation = queryStringFilter.value.participation;
    const querySearch = queryStringFilter.value.search;

    console.log(querySearch);

    // let resultQuery = {};

    if (queryDate != 'all') {
      resultQuery.value = { ...resultQuery.value, date: queryDate };
    } else if (queryParticipation != 'all') {
      resultQuery.value = queryParticipation;
    } else if (querySearch != '') {
      resultQuery.value = { ...resultQuery.value, search: querySearch };
    }

    console.log(resultQuery.value);
    router.push({ query: resultQuery.value });
  };
  // console.log(queryString.value);

  return {
    queryStringFilter,
    // changeQuery,
  };
}
