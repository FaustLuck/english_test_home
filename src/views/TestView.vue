<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <header-component></header-component>
    <div v-if="isTesting">
      <transition name="card-show"
                  v-for="(item,i) of test"
                  :key="item.question+i">
        <card-test-component
          :test-item="item"
          :index="i"
        ></card-test-component>
      </transition>
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
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    cardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
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
    ...mapMutations("test", ["prepareAnswers"]),
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
    }
  },
  async created() {
    this.isLoading = !(await this.requestSettings());
  }
};
</script>

<style lang="scss" scoped>
.card-show {
  &-enter {
    &-from {
      transform: scaleY(0);
    }

    &-active {
      transition: transform 0.5s ease;
    }

    &-to {
      transform: scaleY(1);
    }
  }
}
</style>