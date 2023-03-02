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
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    layoutComponent: defineAsyncComponent(() => import("@/components/layoutComponent")),
    menuComponent: defineAsyncComponent(() => import("@/components/menuComponent"))
  }
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
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-size: 2.5rem;
  background-color: #FFDAB9;

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


input[type="text"],
select {
  font-size: 2.5rem;
  font-family: "serif";
  width: 50%;
  background-color: transparent;
  border: none;
  outline: 1px solid black;
  margin: 3px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  & > option {
    font-size: 2.5rem;
    font-family: "serif";
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;
  }
}

input[type="button"] {
  font-size: 2rem;
  padding: 0 0.5rem;
  font-family: "serif";
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
</style>