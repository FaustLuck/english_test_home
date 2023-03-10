<template>
  <header v-if="mode!=='users' && mode!=='statistic'" :class="{'settings':mode==='settings'}">
    <button-component></button-component>
    <item-add-component v-if="mode==='settings'"></item-add-component>
    <timer-component v-if="isTesting && mode==='test'"></timer-component>
  </header>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { mapActions, mapState as piniaMapSate } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useStatisticStore } from "@/store/statistic";
import { useTestStore } from "@/store/test";

export default {
  name: "headerComponent",
  components: {
    itemAddComponent: defineAsyncComponent(() => import("@/components/itemAddComponent.vue")),
    buttonComponent: defineAsyncComponent(() => import("@/components/buttonComponent.vue")),
    timerComponent: defineAsyncComponent(() => import("@/components/timerComponent.vue")),
  },
  computed: {
    ...piniaMapSate(useTestStore, ["isTesting"]),
    ...piniaMapSate(useAuthStore, ["sub"]),
    ...mapState(["mode", "isLoading"]),
  },
  methods: {
    ...mapActions(useStatisticStore, ["saveChanges"]),
    ...mapMutations(["setLoading"]),
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

  &.settings {
    z-index: 10;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 65px;
  }
}
</style>