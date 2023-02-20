<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <div class="time">
      <span>Ограничение по времени: </span>
      <span>{{ settings.timer.min }}</span> : <span>{{ settings.timer.sec }}</span>
    </div>
    <div class="variants">
      <span>Количество вариантов ответов: </span>
      <span>{{ settings.variants }}</span>
    </div>
    <div class="container">
      <test-difficult-component
        v-for="difficult of orderDifficult"
        :key="difficult"
        :difficult="difficult"
        :part-answers="settings.dictionary[difficult]"
      ></test-difficult-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "SettingsView",
  components: {
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent"))
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapState("auth", ["isAdmin"]),
    ...mapState("settings", ["settings"]),
    ...mapState(["orderDifficult"])
  },
  methods: {
    ...mapActions("settings", ["requestSettings"])
  },
  async created() {
    this.isLoading = !(await this.requestSettings());
  }
};
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
}
</style>