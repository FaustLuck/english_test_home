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
import { testStore } from "@/store/testStore";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "startButtonComponent",
  computed: {
    ...mapState(testStore, ["isTesting"]),
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
    ...mapActions(testStore, ["getTest", "changeTestStatus"]),
    ...mapActions(settingsStore, ["saveChanges"]),
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
input[type="button"] {
  font-size: 2rem;
  padding: 0 0.5rem;
  font-family: "serif";
  border-radius: .5rem;
  cursor: pointer;
  box-shadow: 0 0 10px 2px #e9a66a;
  outline: none;
  border-color: #e9a66a;
  background-color: transparent;
  margin: 3px;

  &:active {
    box-shadow: none;
    outline: 1px solid black;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
</style>