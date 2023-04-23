<template>
  <v-app class="w-100 bg-transparent">
    <header-component @toggleNavigation="isCollapsed=!isCollapsed"/>
    <template v-if="isLogin">
      <navigation
              :is-collapsed="isCollapsed"
              @toExpand="isCollapsed=false"
              @toCollapse="isCollapsed=true"
      />
    </template>
    <v-main>
      <v-container class="pa-0">
        <router-view :key="$route.fullPath"/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

import HeaderComponent from "@/stories/Header.vue";
import Navigation from "@/stories/Navigation.vue";

const { isLogin } = storeToRefs(useAuthStore());
const isCollapsed = ref(true);

</script>
<style lang="scss">
:root {
  font-family: 'serif';
  font-size: 30px;
}

body {
  background-color: #FFDAB9;

  &.fail {
    background-color: red;
    pointer-events: none;
  }

  &.warning {
    animation: wave 10s linear infinite alternate;
  }

  &.flash {
    animation: flash 2s linear infinite;
  }
}

@keyframes wave {
  from {
    background-color: #FFDAB9;
  }
  to {
    background-color: #FF0000;
  }
}

@keyframes flash {
  from, 49.9% {
    background-color: #FF0000;
  }
  50%, to {
    background-color: #FFDAB9;
  }
}
</style>