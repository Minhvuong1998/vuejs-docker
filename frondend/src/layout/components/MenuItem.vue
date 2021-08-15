<template>
  <li
    v-for="(menuItem, index) in linkMenu"
    :key="index"
    :class="{
      active: isActive(menuItem.name),
    }"
  >
    <router-link :to="{ name: menuItem.name + 'search' }">
      <i :class="menuItem.icon" />
      <span>{{ menuItem.label }}</span>
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export interface MenuItem {
  icon?: any;
  label: string;
  isCollapsed?: boolean;
  collapseClass?: string;
  linkActive?: string;
  name: string;
  permission?: string | string[] | number[] | number;
}

export default defineComponent({
  setup() {
    const route = useRoute();

    const linkMenu: MenuItem[] = [
      {
        icon: "fa fa-tachometer-alt",
        label: "Dashboard",
        name: "dashboard-",
      },
      {
        icon: 'fa fa-shopping-cart',
        label: 'User',
        name: 'user-',
      }
    ];

    const isActive = (nameRoute: string) => {
      return route.name?.toString().includes(nameRoute);
    };

    return {
      linkMenu,
      isActive,
    };
  },
});
</script>
