<template>
  <span>{{title}}</span>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { mapActions, mapState } from "vuex";
import { toFill } from "@/utils";

export default {
  name: "TestView",
  data() {
    return {
      test: {}
    };
  },
  computed: {
    title: () => useRoute().name,
    ...mapState("settings", ["settings"]),
    ...mapState("test", ["answers"])
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
      for (let difficult in this.answers) {
        this.test[difficult] = this.answers[difficult].map(el => {
          let {dictionary, limitVariant} = this.settings;
          return this.toFillVariants(el, dictionary[difficult], limitVariant);
        });
      }
    },
    //todo много вложенности в тесте
    toFillVariants(answer, dictionary, limitVariant) {
      let variants = toFill(
        dictionary.map((e) => e.answer).filter((e) => e !== answer),
        limitVariant - 1
      );
      variants.push(answer);
      variants.sort();
      return variants;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>