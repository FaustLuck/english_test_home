<template>
  <layout-component></layout-component>
  <header-component></header-component>
  <menu-component></menu-component>
  <form>
    <router-view :key="$route.fullPath"/>
  </form>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent.vue")),
    layoutComponent: defineAsyncComponent(() => import("@/components/layoutComponent.vue")),
    menuComponent: defineAsyncComponent(() => import("@/components/menuComponent.vue"))
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'serif';
  background-color: #FFDAB9;
  font-size: 2.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }

  &.fail {
    background-color: red;
    pointer-events: none;
  }

}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

form {
  width: 80%;
  max-width: 1200px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 4rem;
  }
}
</style>