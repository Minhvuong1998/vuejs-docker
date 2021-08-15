import { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw>{
  path: "/user",
  component: () => import("../layout/Default.vue"),
  hidden: true,
  children: [
    {
      name: "user-search",
      path: "/user",
      meta: { title: "User" },
      component: () => import("../page/user/UserSearch.vue"),
    },
  ],
};
