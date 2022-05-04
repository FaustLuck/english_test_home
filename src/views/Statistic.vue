<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <form v-else>
    <div
      class="tests"
      v-for="(value, day) in this.tests"
      :key="day"
      @click="
        activeDay = day;
        openTests(value);
      "
      :class="{ open: activeDay === day }"
    >
      <div class="tests__info">
        <span>Дата теста: </span>
        <span class="date">{{ day }}</span>
      </div>
      <div class="tests__info">
        <span>Количество тестов: </span>
        <span>{{ Object.keys(value).length }}</span>
      </div>
      <keep-alive>
        <test-result v-if="activeDay === day" :testsFromParent="testsOfDay"></test-result>
      </keep-alive>
    </div>
  </form>
</template>

<script>
import TestResult from "@/components/TestResult.vue";
export default {
  name: "StatisticPage",
  components: {
    TestResult,
  },
  data() {
    return {
      tests: {},
      loading: true,
      activeDay: "",
      testsOfDay: {},
      path: "statistic",
    };
  },
  async mounted() {
    let statisticStore = this.$store.getters.getInfo(this.path);
    this.tests = Object.keys(statisticStore).length
      ? statisticStore
      : await this.$store.dispatch("fetchData", { path: this.path });
    this.loading = false;
  },
  methods: {
    openTests(value) {
      this.testsOfDay = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.tests {
  border: 1px solid black;
  cursor: default;
  margin: -1px;

  &__info {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;

    & > span {
      padding: 0 1rem;
    }
  }
}
</style>