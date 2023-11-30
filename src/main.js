/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { createHead } from '@unhead/vue';
import { createToaster } from './plugins/toaster/index.js';

// TODO: установить плагины: router, pinia, head(title), toaster, progress
createApp(App)
  .use(router)
  .use(createPinia())
  .use(createHead())
  .use(createToaster())
  .mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
