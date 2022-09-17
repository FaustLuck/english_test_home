<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header-component></header-component>
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
import { mapMutations, mapState } from "vuex";
import { toFill } from "@/utils";
import { defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";

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
      if (!value?.dictionary) return;
      this.isLoading = false;
    },
    answers(value) {
      if (!(Object.keys(value)).length) return;
      this.createTest();
    },
    isTesting(newVal, oldVal) {
      return (newVal > oldVal) ? this.prepareAnswers(this.settings) : this.addChoices();
    }
  },
  methods: {
    ...mapMutations("test", ["prepareAnswers", "saveChoice"]),
    createTest() {
      this.test = [];
      for (let difficult of this.orderDifficult) {
        this.answers[difficult].forEach(el => this.test.push(this.createTestItem(el, difficult)));
      }
    },
    addChoices() {
      this.test.forEach(item => {
        if (!item?.choice) return;
        this.saveChoice({...item});
      });
      useRouter().push({name: "result"});
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
};
</script>

<style lang="scss" scoped>
</style>