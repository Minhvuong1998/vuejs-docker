import isNil from 'lodash/isNil';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const InstalledAppRoutes = import.meta.globEager('./routes/*.ts');

const routes: RouteRecordRaw[] = [];

for(const App in InstalledAppRoutes) {
  const AppRoutes = InstalledAppRoutes[App];
  if (AppRoutes.default instanceof Array) {
    routes.push(...AppRoutes.default);
  } else {
    routes.push(AppRoutes.default);
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = !isNil(to.meta?.auth) ? to.meta.auth : true;
  if (auth && !window.userInfo) {
    return {
      name: 'login',
      query: {
        redirect: encodeURIComponent(to.fullPath)
      }
    }
  }
  return true;
});

export default router;