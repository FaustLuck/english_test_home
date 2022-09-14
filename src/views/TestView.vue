<template>
  <header>{{ title }}</header>
  <card-test-component
    v-for="(item,i) of test"
    :key="item.question"
    :testItem="item"
    :index="i"
    @changeAnswer="(choice)=>this.test[i].choice=choice"
  ></card-test-component>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { mapActions, mapState } from "vuex";
import { toFill } from "@/utils";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    CardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
  },
  data() {
    return {
      test: [],
    };
  },
  computed: {
    title: () => useRoute().name,
    ...mapState("settings", ["settings"]),
    ...mapState("test", ["answers"]),
    ...mapState(["orderDifficult"])
  },
  watch: {
    settings: function (value) {
      if (!value?.dictionary) return;
      this.prepareAnswers(this.settings);
    },
    answers: function (value) {
      if (!value?.easy) return;
      this.createTest();
    }
  },
  methods: {
    ...mapActions("test", ["prepareAnswers"]),
    createTest() {
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