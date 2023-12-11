/** @implements {import('vue-router').NavigationGuard} */
export function authGuard(to) {
  if (to.meta.requireGuest && isAuthenticated()) {
    return { path: '/' };
  } else if (to.meta.requireAuth && !isAuthenticated()) {
    return { path: '/login', query: { from: to.fullPath } };
  } else {
    return true;
  }
}
