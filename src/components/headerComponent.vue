<template>
  <header :class="{center:!isTesting}">
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
    StartButtonComponent: defineAsyncComponent(() => import("@/components/startButtonComponent")),
    TimerComponent: defineAsyncComponent(() => import("@/components/timerComponent")),
  },
  computed: {
    ...mapState("test", ["isTesting"])
  }

};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 3rem;
  margin-bottom: 2rem;

  &.center {
    justify-content: center;
  }
}
</style>