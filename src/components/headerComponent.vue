<template>
  <header v-if="mode!=='users' && mode!=='statistic'" :class="{'settings':mode==='settings'}">
    <start-button-component v-if="mode==='test' || mode==='result'"></start-button-component>
    <input v-if="mode==='settings'" type="button" value="Сохранить">
    <item-add-component v-if="mode==='settings'"></item-add-component>
    <timer-component v-if="isTesting && mode==='test'"></timer-component>
  </header>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";

export default {
  name: "headerComponent",
  components: {
    itemAddComponent: defineAsyncComponent(() => import("@/components/itemAddComponent")),
    startButtonComponent: defineAsyncComponent(() => import("@/components/startButtonComponent")),
    timerComponent: defineAsyncComponent(() => import("@/components/timerComponent")),
  },
  computed: {
    ...mapState("test", ["isTesting"]),
    ...mapState(['mode'])
  }

};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  display: flex;
  max-width: 1200px;
  width: 80%;
  justify-content: space-evenly;
  align-items: center;
  min-height: 3rem;
  padding: 1rem 0;
  background-color: #FFDAB9;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;
  z-index: 1;

  &.settings{
    z-index: 10;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 65px;
  }
}
</style>