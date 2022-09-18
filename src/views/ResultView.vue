<template>
  <header-component></header-component>
  <section class="info">
    <div class="info__login">{{ (isLogin) ? displayName : "Вход не выполнен" }}</div>
    <div class="info__detail">
      <span>Время тестирования:</span>
      <span>{{ dateToString }} {{ time }}</span>
    </div>
    <div class="info__detail">
      <span>Кол-во верных ответов / вопросов:</span>
      <span>{{ correctAnswers }} / {{ lengthAnswers }}</span>
    </div>
    <div class="info__detail">
      <span>Времени затрачено:</span>
      <span>{{ timeSpentToString }}</span>
    </div>
    <div class="info__detail" v-if="isFail">
      <span>Вышло время!</span>
    </div>
  </section>

  <div v-for="difficult in orderDifficult" :key="difficult">
    <div class="result__difficult">{{ difficult }}</div>
    <card-test-component
      v-for="(answer,index) of answers[difficult]"
      :key="answer.answer"
      :test-item="{...answer,difficult}"
      :index="index"
    >
    </card-test-component>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CardTestComponent from "@/components/cardTestComponent";
import HeaderComponent from "@/components/headerComponent";

export default {
  name: "ResultView",
  components: {HeaderComponent, CardTestComponent},
  computed: {
    ...mapState("test", ["answers", "timeSpent", "date", "time"]),
    ...mapState("auth", ["displayName", "isLogin"]),
    ...mapState(["orderDifficult"]),
    lengthAnswers() {
      return (Object.values(this.answers)).reduce((acc, cur) => acc + cur.length, 0);
    },
    correctAnswers() {
      return (Object.values(this.answers)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el.choice).length;
      }, 0);
    },
    isFail() {
      return (this.timeSpent === 300);
    },
    congratulation() {
      return this.lengthAnswers === this.correctAnswers;
    },
    timeSpentToString() {
      let sec = (this.timeSpent % 60).toString().padStart(2, "0");
      let min = (this.timeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    dateToString(){
      return this.date.split('-').reverse().join('.')
    }
  },
  mounted() {
    if (this.congratulation) setTimeout(() => {
      this.$router.push({name: "fire-show"});
    }, 3000);
  },
  methods: {
    ...mapMutations("test", ["saveTimes"])
  },
  beforeRouteEnter(to, from, next) {
    (from.name !== "test") ? next({name: "test"}) : next();
  }
};
</script>

<style lang="scss" scoped>
.info {
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  padding: 1rem;
  background: #FFDAB9;

  &__login {
    text-align: center;
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    padding: .5rem;
  }
}

.result__difficult {
  text-align: center;
  font-size: 60px;
  margin-top: 1rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;
}
</style>