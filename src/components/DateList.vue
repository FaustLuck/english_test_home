<template>
  <div
    class="tests"
    v-for="date of dateArray"
    :key="date.day"
    @click="
      activeDay = date.day;
      testsOfDay = tests[date.day];
    "
  >
    <div class="tests__info">
      <span>Дата теста: </span>
      <span class="date">{{ date.output }}</span>
    </div>
    <div class="tests__info">
      <span>Количество тестов: </span>
      <span>{{ Object.keys(tests[date.day]).length }}</span>
    </div>
    <keep-alive>
      <test-result
        v-if="activeDay === date.day"
        :testsFromParent="testsOfDay"
      ></test-result>
    </keep-alive>
  </div>
</template>

<script>
import TestResult from "@/components/TestResult.vue";

export default {
  name: "StatisticPage",
  components: {
    TestResult,
  },
  props: {
    tests: Object,
  },
  data() {
    return {
      loading: true,
      activeDay: "",
      testsOfDay: {},
      dateArray: [],
    };
  },
  async mounted() {
    this.dateArray = Object.keys(this.tests).reverse();
    this.prepareDate();
  },
  methods: {
    prepareDate() {
      for (let i = 0; i < this.dateArray.length; i++) {
        let date = this.dateArray[i];
        date = {
          day: date,
          output: date.split("-").reverse().join("."),
        };
        this.dateArray[i] = date;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tests {
  border: 1px solid black;
  cursor: default;
  margin: -1px;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  &__info {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
      padding: 0 1rem;
    }
  }
}
</style>