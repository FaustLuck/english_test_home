<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header>
      <start-button-component></start-button-component>
      <timer-component></timer-component>
      <div></div>
    </header>
    <div v-if="isTesting">
      <card-test-component
        v-for="(item,i) of test"
        :key="item.question+i"
        :testItem="item"
        :index="i"
        @changeAnswer="(choice)=>this.test[i].choice=choice"
      ></card-test-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { toFill } from "@/utils";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    PreloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    StartButtonComponent: defineAsyncComponent(() => import("@/components/startButtonComponent")),
    TimerComponent: defineAsyncComponent(() => import("@/components/timerComponent")),
    CardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
  },
  data() {
    return {
      test: [],
      isLoading: true
    };
  },
  computed: {
    ...mapState("settings", ["settings"]),
    ...mapState("test", ["answers", "isTesting"]),
    ...mapState(["orderDifficult"])
  },
  watch: {
    settings(value) {
      if (!value?.dictionary) return;
      this.isLoading = false;
    },
    answers(value) {
      if (!value?.easy) return;
      this.createTest();
    },
    isTesting(value) {
      if (!value) return;
      this.prepareAnswers(this.settings);
    }
  },
  methods: {
    ...mapActions("test", ["prepareAnswers"]),
    createTest() {
      this.test = [];
      for (let difficult of this.orderDifficult) {
        this.answers[difficult].forEach(el => this.test.push(this.createTestItem(el, difficult)));
      }
    },
    toFillVariants(answer, dictionary, limitVariant) {
      let variants = toFill(
        dictionary.filter((e) => e !== answer),
        limitVariant - 1
      );
      variants.push(answer);
      variants.sort();
      return variants;
    },
    createTestItem(el, difficult) {
      let {dictionary, variants} = this.settings;
      dictionary = dictionary[difficult].map(e => e.answer);
      return {
        answer: this.toFillVariants(el.answer, dictionary, variants),
        choice: undefined,
        difficult,
        question: el.question
      };
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 3rem;
}
</style>