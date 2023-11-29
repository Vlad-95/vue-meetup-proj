import { createRouter, createWebHistory } from 'vue-router';
import { scrollBehavior } from './scrollBehaviour.js';
import { authGuard } from './authGuard.js';

/** @type {import('vue-router').RouteRecordRaw[]} */
export const routes = [
  // Only for demo
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo/PageDemo.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/PageMeetups.vue'),
  },
  {
    path: '/meetups',
    name: 'meetups',
    redirect: { name: 'index' },
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    redirect: (to) => ({ name: 'meetup.description', params: to.params }),
    component: () => import('../views/PageMeetup.vue'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup.description',
        component: () => import('../views/PageMeetupDescription.vue'),
      },
      {
        path: 'agenda',
        name: 'meetup.agenda',
        component: () => import('../views/PageMeetupAgenda.vue'),
      },
    ],
  },
  // TODO: Task 05-vue-router/01-AuthPages = Готово
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/PageLogin.vue'),
    props: (route) => ({ query: route.query.from }),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/PageRegister.vue'),
  },
  {
    path: '/meetups/create',
    name: 'meetupCreate',
    // TODO: Добавить страницу создания митапа = Готово
    component: () => import('../views/PageCreateMeetup.vue'),
  },
  {
    // TODO: Добавить страницу редактирования митапа = Готово
    path: '/meetups/:meetupId(\\d+)/edit',
    name: 'meetupEdit',
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    component: () => import('../views/PageEditMeetup.vue'),
  },
  // TODO: Task 05-vue-router/02-PageNotFound
  {
    path: '/:unknownPath(.*)',
    component: () => import('../views/PageNotFound.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach(authGuard);
