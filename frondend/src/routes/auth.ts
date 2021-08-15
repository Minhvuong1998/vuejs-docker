import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
    name: 'login',
    path: '/',
    meta: { auth: false },
    component: () => import('../page/Login.vue'),
}