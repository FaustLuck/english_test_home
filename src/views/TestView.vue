<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header-component></header-component>
    <div v-if="isTesting">
      <card-test-component
        v-for="(item,i) of test"
        :key="item.question+i"
        :test-item="item"
        :index="i"
      ></card-test-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { toFill } from "@/utils";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    HeaderComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    PreloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
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
      if (!Object.keys(value).length) return;
      this.isLoading = false;
    },
    answers(value) {
      if (!(Object.keys(value)).length) return;
      this.createTest();
    },
    isTesting(value) {
      return (value) ? this.prepareAnswers(this.settings) : this.$router.push({name: "result"});
    }
  },
  methods: {
    ...mapMutations("test", ["prepareAnswers"]),
    ...mapActions("settings", ["getSettings"]),
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
        difficult,
        question: el.question
      };
    }
  },
  async created() {
    await this.getSettings();
  },
  beforeRouteEnter(to, from, next) {
    (from.name === "result") ? next(vm => {
      vm.prepareAnswers(vm.settings);
    }) : next();
  }
};
</script>

<style lang="scss" scoped>
</style>