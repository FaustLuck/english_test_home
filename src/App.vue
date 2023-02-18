<template>
  <layout-component></layout-component>
  <menu-component></menu-component>
  <form>
    <router-view :key="$route.fullPath"/>
  </form>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    layoutComponent: defineAsyncComponent(() => import("@/components/layoutComponent")),
    menuComponent: defineAsyncComponent(() => import("@/components/menuComponent"))
  },
};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

body {
  font-family: 'serif';

  &.fail {
    background-color: red;
    pointer-events: none;
  }

}

#app {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  font-size: 2.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
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