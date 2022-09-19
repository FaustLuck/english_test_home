<template>
  <header-component></header-component>
  <info-detail-component
    :timestamp="timestamp"
    :answers="answers"
    :time-spent="timeSpent"
    @congratulation="showCongratulation"
  >
  </info-detail-component>
  <div v-for="difficult in orderDifficult" :key="difficult">
    <div class="result__difficult">{{ difficult }}</div>
    <card-test-component
      v-for="(answer,index) of answers[difficult]"
      :key="answer.answer"
      :test-item="{...answer,difficult}"
      :index="index"
    >
    </card-test-component>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex/dist/vuex.esm-browser.prod";

export default {
  name: "ResultView",
  components: {
    InfoDetailComponent: defineAsyncComponent(() => import("@/components/infoDetailComponent")),
    HeaderComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    CardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
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

.result__difficult {
  text-align: center;
  font-size: 60px;
  margin-top: 1rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;
}
</style>