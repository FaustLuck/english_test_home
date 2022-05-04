<template>
  <div
    class="test"
    :class="{ congratulations: value.congratulations }"
    v-for="(value, time) in tests"
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
export default {
  name: "TestResult",
  components: {
    DifficultList,
  },
  props: {
    tests: Object,
  },
  data() {
    return {
      activeTime: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: -1px;

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

