// TODO: реализовать функции, необходимые для авторизации, помимо работы с API
// Например, сохранения данных пользователя в LS, восстановления и удаления
// import { loginUser, logoutUser } from '../api/authApi';

// export async function login(email, password) {
//   return await loginUser(email, password);
// }

// export async function logout() {
//   console.log('out');
//   return await logoutUser();
// }

export function getUserLS() {
  return JSON.parse(localStorage.getItem('user'));
}

export function setUserLS(item) {
  return localStorage.setItem('user', JSON.stringify(item));
}

export function removeUserLS() {
  return localStorage.removeItem('user');
}
