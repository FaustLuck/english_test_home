<template>
  <header>
    <start-button-component></start-button-component>
    <timer-component v-if="isTesting"></timer-component>
  </header>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";

export default {
  name: "headerComponent",
  components: {
    startButtonComponent: defineAsyncComponent(() => import("@/components/startButtonComponent")),
    timerComponent: defineAsyncComponent(() => import("@/components/timerComponent")),
  },
  computed: {
    ...mapState("test", ["isTesting"])
  }

};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 3rem;
  padding: 1rem 0;
  background-color: #FFDAB9;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;
  z-index: 1;
  @media screen and (max-width: 768px) {
    padding: 0;
    top: 65px;
  }
}
</style>