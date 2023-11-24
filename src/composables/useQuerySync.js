import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useQuerySync() {
  const router = useRouter();
  const route = useRoute();

  const queryStringView = ref(null);

  // const changeQuery = computed(() => {});

  watch(queryStringView, () => {
    console.log(queryString);
  });

  const queryStringUpdate = () => {};
  // console.log(queryString.value);

  return {
    queryStringView,
    // changeQuery,
  };
}
