<template>
  <header v-if="mode!=='users' && mode!=='statistic'" :class="{'settings':mode==='settings'}">
    <button-component
      v-if="['test','result'].includes(mode)"
      :value="(isTesting)?'Завершить тест' : 'Начать тест'"
      :loading="isLoading"
      @click="(isTesting)?changeTestStatus(false):startTest()"
    ></button-component>
    <button-component
      v-if="mode==='settings'"
      :value="'Сохранить'"
      :loading="isLoading"
      :title="'Сохранить изменения'"
      @click="save"
    ></button-component>
    <item-add-component v-if="mode==='settings'"></item-add-component>
    <timer-component v-if="isTesting && mode==='test'"></timer-component>
  </header>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { authStore } from "@/store/authStore";
import { testStore } from "@/store/testStore";
import { mainStore } from "@/store/mainStore";
import { useSettingsStore } from "@/store/settings.ts";

export default {
  name: "headerComponent",
  components: {
    itemAddComponent: defineAsyncComponent(() => import("@/components/itemAddComponent.vue")),
    buttonComponent: defineAsyncComponent(() => import("@/stories/Button.vue")),
    timerComponent: defineAsyncComponent(() => import("@/components/timerComponent.vue")),
  },
  computed: {
    ...mapState(testStore, ["isTesting"]),
    ...mapState(authStore, ["sub"]),
    ...mapState(mainStore, ["mode", "isLoading"]),
    ...mapState(useSettingsStore, ["isSaved"])
  },
  methods: {
    ...mapActions(useSettingsStore, ["saveChanges"]),
    ...mapActions(mainStore, ["setLoading"]),
    ...mapActions(testStore, ["getTest", "changeTestStatus"]),
    async startTest() {
      if (this.mode !== "test") this.$router.replace({name: "test"});
      this.setLoading(true);
      await this.getTest(this.sub);
      this.changeTestStatus(true);
      this.setLoading(false);
    },
    async save() {
      if (this.isSaved) return;
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

  &.settings {
    z-index: 10;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 65px;
  }

  @media screen and (max-width: 576px) {
    top: 50px;
  }

}
</style>