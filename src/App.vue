<template>
  <v-app class="w-100 bg-transparent">
    <app-bar/>

    <v-main>
      <v-container class="pa-0">
        <router-view :key="$route.fullPath"/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import AppBar from "@/components/app/AppBar.vue";

</script>
<style lang="scss">
:root {
  font-family: 'serif';
  font-size: 30px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media screen and (max-width: 576px) {
    font-size: 15px;
  }

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