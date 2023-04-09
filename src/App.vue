<template>
  <v-app class="w-100 bg-transparent">
    <header-component @toggleNavigation="isCollapsed=!isCollapsed"/>
    <template v-if="isLogin">
      <navigation-component
              :is-collapsed="isCollapsed"
              @toExpand="isCollapsed=false"
              @toToggle="isCollapsed=!isCollapsed"
      />
    </template>
    <v-main>
      <router-view :key="$route.fullPath"/>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const NavigationComponent = defineAsyncComponent(() => import("@/stories/Navigation.vue"));
const HeaderComponent = defineAsyncComponent(() => import("@/stories/Header.vue"));

const { isLogin } = storeToRefs(useAuthStore());
const isCollapsed = ref(true);

</script>
<style lang="scss">
:root {
  font-family: 'serif';
  font-size: 30px;
}

html {
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }
}

body {
  background-color: #FFDAB9;

  &.fail {
    background-color: red;
    pointer-events: none;
  }

}
</style>