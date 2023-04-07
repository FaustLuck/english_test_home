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
:root{
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