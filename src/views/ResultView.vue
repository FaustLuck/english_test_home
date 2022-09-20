<template>
  <header-component></header-component>
  <info-test-component
    :timestamp="timestamp"
    :test="answers"
    :time-spent="timeSpent"
    @congratulation="showCongratulation"
  >
  </info-test-component>
  <difficult-test-component
    v-for="difficult of orderDifficult"
    :key="difficult"
    :difficult="difficult"
    :part-answers="answers[difficult]"
  ></difficult-test-component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex/dist/vuex.esm-browser.prod";

export default {
  name: "ResultView",
  components: {
    DifficultTestComponent:defineAsyncComponent(() => import("@/components/difficultTestComponent")),
    InfoTestComponent: defineAsyncComponent(() => import("@/components/infoTestComponent")),
    HeaderComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
  },
  watch: {
    async isLogin(value) {
      if (value) await this.sendAnswersToDB({uid: this.uid});
    }
  },
  computed: {
    ...mapState("test", ["answers", "timestamp", "timeSpent"]),
    ...mapState(["orderDifficult"]),
    ...mapState("auth", ["isLogin", "uid"])
  },
  methods: {
    ...mapActions("test", ["sendAnswersToDB"]),
    showCongratulation() {
      setTimeout(() => {
        this.$router.push({name: "fire-show"});
      }, 3000);
    }
  },
  async created() {
    if (this.isLogin) await this.sendAnswersToDB({uid: this.uid});
  },
  beforeRouteEnter(to, from, next) {
    (from.name !== "test") ? next({name: "test"}) : next();
  }
};
</script>

<style lang="scss" scoped>

</style>