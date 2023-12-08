import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export function useQuerySync() {
  const router = useRouter();
  // const queryStringFilter = ref(null);

  // watch(
  //   queryStringFilter,
  //   () => {
  //     queryStringUpdate();
  //   },
  //   { deep: true }
  // );

  // const queryStringUpdate = () => {
  //   const queryDate = queryStringFilter.value.date;
  //   const queryParticipation = queryStringFilter.value.participation;
  //   const querySearch = queryStringFilter.value.search;

  //   let resultQuery = {};

  //   if (queryDate != 'all') {
  //     resultQuery.date = queryDate;
  //   } else {
  //     delete resultQuery.date;
  //   }

  //   if (queryParticipation != 'all') {
  //     resultQuery.participation = queryParticipation;
  //   } else {
  //     delete resultQuery.participation;
  //   }

  //   if (querySearch != '') {
  //     resultQuery.search = querySearch;
  //   } else {
  //     delete resultQuery.search;
  //   }

  //   router.push({ query: resultQuery });
  // };

  const changeQueryFromFilter = (filter, view, queries) => {
    const filterDate = filter.value.date;
    const filterParticipation = filter.value.participation;
    const filterSearch = filter.value.search;
    const viewType = view.value;

    let resultQuery = {};

    if (filterDate != 'all') {
      resultQuery.date = filterDate;
    } else {
      delete resultQuery.date;
    }

    if (filterParticipation != 'all') {
      resultQuery.participation = filterParticipation;
    } else {
      delete resultQuery.participation;
    }

    if (filterSearch != '') {
      resultQuery.search = filterSearch;
    } else {
      delete resultQuery.search;
    }

    router.push({ query: { ...resultQuery } });
  };

  const changeQueryFromUrl = (filter, queries) => {};

  return {
    // queryStringFilter,
    changeQueryFromFilter,
    changeQueryFromUrl,
  };
}
