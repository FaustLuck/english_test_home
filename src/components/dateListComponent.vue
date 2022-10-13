<template>
  <title-component
    :title="`${date} Тестов: ${timeArray.length}`"
    v-slot="{heightTitle}"
  >
    <test-info-component
      v-for="timeObj of timeArray"
      :heightTitle="heightTitle"
      :key="timeObj.timestamp"
      :date="date"
      :time="timeObj.time"
      :answers="answers(timeObj.timestamp)"
    ></test-info-component>
  </title-component>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "dateListComponent",
  components: {
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent")),
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent")),

  },
  props: {
    uid: String,
    date: String,
    timeArray: Array
  },
  computed: {
    ...mapGetters("statistic", ["getAnswers"]),
    ...mapState(["orderDifficult"]),
  },
  methods: {
    answers(timestamp) {
      return this.getAnswers(this.uid, timestamp);
    },
  },
};
</script>

<style scoped lang="scss">

</style>