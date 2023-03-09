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
*{
  margin: 0;
  padding: 0;
}

body {
  font-family: 'serif';
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

input {
  font-size: 2.5rem;
  font-family: "serif";
  background-color: transparent;
  margin: 3px;

  &:not([type='radio']){
    border: none;
    outline: 1px solid black;
  }

  &[type="text"] {
    width: 50%;
  }

  &[type="number"] {
    width: 3ch;
    text-align: center;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
    }
  }

  &[type="radio"] {
    transform: scale(2, 2);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      transform: scale(1.5, 1.5);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
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
</style>