import { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw>{
  path: "/dashboard",
  component: () => import("../layout/Default.vue"),
  hidden: true,
  children: [
    {
      name: "dashboard-search",
      path: "/dashboard",
      meta: { title: "Dashboard" },
      component: () => import("../page/Dashboard.vue"),
    },
  ],
};
