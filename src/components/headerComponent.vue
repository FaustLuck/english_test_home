<template>
  <header v-if="mode!=='users' && mode!=='statistic'" :class="{'settings':mode==='settings'}">
    <start-button-component v-if="mode==='test' || mode==='result'"></start-button-component>
    <input
      v-if="mode==='settings'"
      type="button"
      @click="save"
      :value="isLoading?'Подождите...':'Сохранить'"
      :disabled="isLoading">
    <item-add-component v-if="mode==='settings'"></item-add-component>
    <timer-component v-if="isTesting && mode==='test'"></timer-component>
  </header>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "headerComponent",
  components: {
    itemAddComponent: defineAsyncComponent(() => import("@/components/itemAddComponent.vue")),
    startButtonComponent: defineAsyncComponent(() => import("@/components/startButtonComponent.vue")),
    timerComponent: defineAsyncComponent(() => import("@/components/timerComponent.vue")),
  },
  computed: {
    ...mapState("test", ["isTesting"]),
    ...mapState("auth", ["sub"]),
    ...mapState(["mode", "isLoading"]),
  },
  methods: {
    ...mapActions("settings", ["saveChanges"]),
    ...mapMutations(["setLoading"]),
    async save() {
      this.setLoading(true);
      await this.saveChanges(this.sub);
      this.setLoading(false);
    }
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