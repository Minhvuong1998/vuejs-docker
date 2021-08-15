<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light bg-white">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
        :class="{
          'ms-4': !isHiddenMenu,
        }"
      >
        {{ title }}
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
          <router-link
            :to="{ name: 'login' }"
            class="nav-link"
          >
            Log out
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed,defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    isHiddenMenu: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const route = useRoute();

    return {
      title: computed(() => route.meta.title),
    };
  },
});
</script>

<style scoped>
.bg-white {
  background-color: white;
}
</style>
