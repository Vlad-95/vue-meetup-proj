import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { setUserLS, getUserLS, removeUserLS } from '../services/authService';
import { loginUser, logoutUser, getUser } from '../api/authApi';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(getUserLS());
  const isAuthenticated = computed(() =>
    !!user.value ? user.value.success : false
  );

  const setUser = (value) => {
    user.value = value;
  };

  const login = async (email, password) => {
    const user = await loginUser(email, password);
    setUser(user);
    setUserLS(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    removeUserLS();
  };

  // TODO: Добавить метод актуализации данных пользователя с API
  const getAuthUser = async () => {
    return await getUser();
  };

  return {
    user,
    isAuthenticated,
    setUser,
    getAuthUser,
    login,
    logout,
  };
});
