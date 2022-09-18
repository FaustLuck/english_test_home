<template>
  <header-component></header-component>
  <info-detail-component
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
import { mapMutations, mapState } from "vuex";
import CardTestComponent from "@/components/cardTestComponent";
import HeaderComponent from "@/components/headerComponent";
import InfoDetailComponent from "@/components/infoDetailComponent";

export default {
  name: "ResultView",
  components: {InfoDetailComponent, HeaderComponent, CardTestComponent},
  computed: {
    ...mapState("test", ["answers"]),
    ...mapState(["orderDifficult"]),
  },
  methods: {
    ...mapMutations("test", ["saveTimes"]),
    showCongratulation() {
      setTimeout(() => {
        this.$router.push({name: "fire-show"});
      }, 3000);
    }
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