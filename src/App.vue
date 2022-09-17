<template>
  <menu-component></menu-component>
  <form>
    <router-view/>
  </form>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
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
  background-color: peachpuff;
}

#app {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  font-size: 40px;
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