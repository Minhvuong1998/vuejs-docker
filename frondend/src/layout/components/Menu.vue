<template>
  <nav
    id="sidebar"
    class="sidebar-wrapper"
  >
    <div class="sidebar-content">
      <div class="sidebar-brand">
        <a href="#">pro sidebar</a>
        <div
          id="close-sidebar"
          @click="closeMenu(false)"
        >
          <i class="fas fa-times" />
        </div>
      </div>
      <div class="sidebar-header">
        <div class="user-pic">
          <img
            class="img-responsive img-rounded"
            src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
            alt="User picture"
          >
        </div>
        <div class="user-info">
          <span
            class="user-name"
          >Jhon
            <strong>Smith</strong>
          </span>
          <span class="user-role">Administrator</span>
          <span class="user-status">
            <i class="fa fa-circle" />
            <span>Online</span>
          </span>
        </div>
      </div>
      <div class="sidebar-menu">
        <ul>
          <MenuItem />
        </ul>
      </div>
    </div>
    <div class="sidebar-footer">
      <a href="#">
        <i class="fa fa-bell" />
        <span class="badge badge-pill badge-warning notification">3</span>
      </a>
      <a href="#">
        <i class="fa fa-envelope" />
        <span class="badge badge-pill badge-success notification">7</span>
      </a>
      <a href="#">
        <i class="fa fa-cog" />
        <span class="badge-sonar" />
      </a>
      <a href="#">
        <i class="fa fa-power-off" />
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MenuItem from "./MenuItem.vue";

export default defineComponent({
  components: {
    MenuItem,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const closeMenu = (value: boolean) => {
      emit("update:modelValue", value);
    };

    return {
      closeMenu,
    };
  },
});
</script>
