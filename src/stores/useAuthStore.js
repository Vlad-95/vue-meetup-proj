import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { loginUser, logoutUser, getUser } from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  const login = async (email, password) => {
    user.value = await loginUser(email, password);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // TODO: Добавить метод актуализации данных пользователя с API
  const getAuthUser = async () => {
    return await getUser();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    login,
    logout,
    getAuthUser,
  };
});
