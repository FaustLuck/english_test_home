<template>
  <start-button
    v-if="this.$router.currentRoute.value.path === '/result'"
  ></start-button>
  <div
    class="test"
    v-for="(value, time) in tests"
    :class="{ congratulations: value.congratulations }"
    :key="time"
    @click="activeTime = time"
  >
    <div class="test__detail">
      <span> Время выполнения теста: </span>
      <span class="time">
        {{ time }}
      </span>
    </div>
    <div class="test__detail">
      <span> Затраченное время: </span>
      <span> {{ value["time spent"] }} </span>
    </div>
    <div class="test__detail">
      <span> Кол-во верных ответов / вопросов: </span>
      <span> {{ value.correctAnswers }} / {{ value.questions }} </span>
    </div>
    <div class="test__detail">
      <span>Причина:</span>
      <span>{{ value.reason }} </span>
    </div>
    <keep-alive>
      <difficult-list
        v-if="activeTime === time"
        :difficults="value.answers"
        :congratulations="value.congratulations"
      ></difficult-list>
    </keep-alive>
  </div>
</template>

<script>
import DifficultList from "@/components/DifficultList.vue";
import { mapState } from "vuex";
import StartButton from "@/components/UI/StartButton";

export default {
  name: "TestResult",
  components: {
    StartButton,
    DifficultList,
  },
  props: {
    testsFromParent: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      activeTime: "",
      tests: [],
      timerId: 0,
    };
  },
  computed: {
    ...mapState("authorization", ["login", "uid"]),
  },
  watch: {
    login: function () {
      return this.saveStatistic();
    },
  },
  created() {
    if (this.login) this.saveStatistic();
    if (this.testsFromParent === undefined) {
      let time = this.$store.getters.getTime[1];
      this.tests = this.$store.getters.getAnswer;
      let tmp = {};
      tmp[time] = { ...this.tests };
      this.tests = tmp;
      this.activeTime = Object.keys(this.tests)[0];
      if (this.tests[this.activeTime].congratulations) this.toWait();
    } else {
      this.tests = this.testsFromParent;
    }
  },
  methods: {
    toWait() {
      this.timerId = setTimeout(() => {
        this.$router.push("fireshow");
      }, 5000);
    },
    saveStatistic() {
      if (!this.login) return;
      let data = this.$store.getters.getAnswer;
      this.$store.dispatch("statistic/setStatistic", { data, uid: this.uid });
    },
  },
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: -1px;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  &.congratulations {
    background-color: darkseagreen;
  }

  &__detail {
    display: flex;
    justify-content: space-between;

    span {
      padding: 0.5rem 1rem;
    }
  }
}
</style>