<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header-component></header-component>
    <div v-if="isTesting">
      <item-component
        v-for="(item,i) of test"
        :key="item.question+i"
      >
        <div class="item__column">
          <card-test-item-component
            :item="item.question"
            :type="'question'"
          ></card-test-item-component>
        </div>
        <div class="item__column">
          <card-test-item-component
            v-for="answer of item.answer"
            :key="answer"
            :name="item.difficult+i"
            :item="answer"
            :type="'answer'"
            :choice="item.choice"
            @updateChoice="(choice)=>updateChoice(choice,item)"
          ></card-test-item-component>
        </div>
      </item-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { toFill } from "@/utils/toFill";

export default {
  name: "TestView",
  components: {
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent")),
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent"))
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
    answers(value) {
      if (!(Object.keys(value)).length) return;
      this.createTest();
    },
    isTesting(value) {
      return (value) ? this.prepareAnswers(this.settings) : this.$router.push({name: "result"});
    }
  },
  methods: {
    ...mapMutations("test", ["prepareAnswers", "saveChoice"]),
    ...mapActions("settings", ["requestSettings"]),
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
    },
    updateChoice(choice, item) {
      this.saveChoice({
        choice,
        question: item.question,
        difficult: item.difficult
      });
    },
  },
  async created() {
    this.isLoading = !(await this.requestSettings());
  }
};
</script>

<style lang="scss" scoped>
.item__column {
  width: 50%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
  }
}
</style>