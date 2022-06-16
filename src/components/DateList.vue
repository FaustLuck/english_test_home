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
      <span>{{ testsOnDay(tests[date.day]) }}</span>
    </div>
    <keep-alive>
      <test-result
        v-if="mode === 'result' || activeDay === date.day"
        :tests="testsOfDay"
        :mode="mode"
      ></test-result>
    </keep-alive>
  </div>
</template>
<script>
import TestResult from "@/components/TestResult.vue";

export default {
  name: "DateList",
  components: {
    TestResult,
  },
  props: {
    tests: Object,
    mode: String,
  },
  data() {
    return {
      activeDay: "",
      testsOfDay: {},
    };
  },
  created() {
    let firstDate = Object.keys(this.tests);
    if (this.mode === "result") this.testsOfDay = this.tests[firstDate];
  },
  computed: {
    dateArray() {
      let dateList = Object.keys(this.tests).reverse();
      return this.prepareDate(dateList);
    },
    testsOnDay() {
      return (array) => Object.keys(array).length;
    },
  },
  methods: {
    prepareDate(dateArray) {
      for (let i = 0; i < dateArray.length; i++) {
        let date = dateArray[i];
        date = {
          day: date,
          output: date.split("-").reverse().join("."),
        };
        dateArray[i] = date;
      }
      return dateArray;
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