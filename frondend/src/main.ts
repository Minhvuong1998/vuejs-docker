import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { createApp } from 'vue';

import App from './App.vue';
import install from './install';
import router from './router';

const userInfoJSON = localStorage.getItem('userInfo');
try {
  const userInfo = JSON.parse(userInfoJSON!);
  window.userInfo = userInfo;
} catch (_err) {
  //
}

const app = createApp(App);
app.use(router);
app.use(install);
app.mount('#app');
