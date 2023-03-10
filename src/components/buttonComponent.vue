<template>
  <input
    type="button"
    :value="title"
    :disabled="isLoading"
    @click="checkClick"/>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { authStore } from "@/store/authStore";
import { useTestStore } from "@/store/test";
import { useSettingsStore } from "@/store/settings";
import { mainStore } from "@/store";

export default {
  name: "startButtonComponent",
  computed: {
    ...mapState(useTestStore, ["isTesting"]),
    ...mapState(authStore, ["sub"]),
    ...mapState(mainStore, ["mode", "isLoading"]),
    title() {
      if (this.testMode) {
        return (this.isTesting) ? "Завершить тест" : "Начать тест";
      } else {
        return (this.isLoading) ? "Подождите..." : "Сохранить";
      }
    },
    testMode() {
      return this.mode === "test" || this.mode === "result";
    },
    settingMode() {
      return this.mode === "settings";
    }
  },
  methods: {
    ...mapActions(mainStore,["setLoading"]),
    ...mapActions(useTestStore, ["getTest", "changeTestStatus"]),
    ...mapActions(useSettingsStore, ["saveChanges"]),
    checkClick() {
      if (this.testMode) this.changeStatus();
      if (this.settingMode) this.save();
    },
    async changeStatus() {
      if (!this.isTesting) {
        if (this.mode !== "test") this.$router.replace({name: "test"});
        this.setLoading(true);
        await this.getTest({sub: this.sub});
        this.changeTestStatus(true);
        this.setLoading(false);
      } else {
        this.changeTestStatus(false);
        this.setLoading(true);
        this.$router.push({name: "result"});
      }
    },
    async save() {
      this.setLoading(true);
      await this.saveChanges(this.sub);
      this.setLoading(false);
    }
  }
};
</script>

<style scoped lang="scss">
</style>