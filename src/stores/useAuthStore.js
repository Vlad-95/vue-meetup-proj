import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser } from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  const login = async (email, password) => {
    user.value = await loginUser(email, password);
  };

  // TODO: Добавить метод актуализации данных пользователя с API

  return {
    user,
    isAuthenticated,
    setUser,
    login,
  };
});
