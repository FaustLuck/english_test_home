<template>
  <title-component
    v-if="partAnswers.length"
    :title="difficult"
    :must-is-open="mode!=='settings'"
    :must-is-top="mode!=='settings'"
  >
    <card-test-component
      v-for="(answer,index) of partAnswers"
      :key="answer.answer"
      :test-item="{...answer,difficult}"
      :index="index"
    >
    </card-test-component>
  </title-component>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "testDifficultComponent",
  components: {
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent")),
    cardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
  },
  props: {
    difficult: String,
    partAnswers: Array,
  },
  computed: {
    mode() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped lang="scss">

</style>