<template>
  <section class="info"
           :class="{
    fail:isFail && mode==='statistic',
    congratulation:correctAnswers===lengthAnswers && mode==='statistic',
  }">
    <div v-if="mode==='result'" class="info__login">{{ (isLogin) ? displayName : "Вход не выполнен" }}</div>
    <div class="info__detail-clickable">
      <div class="info__detail">
        <span>Время тестирования:</span>
        <span>{{ localDate }} {{ localTime }} </span>
      </div>
      <div class="info__detail">
        <span>Кол-во верных ответов / вопросов:</span>
        <span>{{ correctAnswers }} / {{ lengthAnswers }}</span>
      </div>
      <div class="info__detail">
        <span>Времени затрачено:</span>
        <span>{{ timeSpentToString }}</span>
      </div>
      <div class="info__detail-fail" v-if="isFail && mode==='result'">
        <span>Время вышло!</span>
      </div>
    </div>
    <div v-if="timestamp">
      <test-difficult-component
        v-for="difficult of orderDifficult"
        :key="difficult"
        :difficult="difficult"
        :part-answers="test[difficult]"
      ></test-difficult-component>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getDate } from "@/utils";
import { defineAsyncComponent } from "vue";

export default {
  name: "testInfoComponent",
  components: {
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent"))
  },
  props: {
    answers: Object,
    timestamp: Number,
    date: String,
    time: String
  },
  data() {
    return {
      localDate: "",
      localTime: "",
      test: null,
      timeSpent: 0,
      top: 0
    };
  },
  computed: {
    ...mapState("auth", ["displayName", "isLogin"]),
    ...mapGetters("settings", ["getTimer"]),
    ...mapState(["orderDifficult"]),
    timerStart() {
      if (!this.getTimer) return;
      let {min, sec} = this.getTimer;
      return min * 60 + sec;
    },
    mode() {
      return this.$route.name;
    },
    lengthAnswers() {
      return (Object.values(this.test)).reduce((acc, cur) => acc + cur.length, 0);
    },
    correctAnswers() {
      return (Object.values(this.test)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el.choice).length;
      }, 0);
    },
    timeSpentToString() {
      let sec = (this.timeSpent % 60).toString().padStart(2, "0");
      let min = (this.timeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    isFail() {
      return (this.timerStart === this.answers.timeSpent);
    }
  },
  created() {
    ({test: this.test, timeSpent: this.timeSpent} = {...this.answers});
    if (this.lengthAnswers === this.correctAnswers) this.$emit("congratulation");
    if (this.timestamp) {
      [this.localDate, this.localTime] = getDate(this.timestamp);
    } else {
      [this.localDate, this.localTime] = [this.date, this.time];
    }
  },
  // updated() {
    // this.top = this.$el.getBoundingClientRect().top;
    // window.scrollBy({top: this.top - 63, behavior: "smooth"});
  // }
};
</script>

<style scoped lang="scss">
.info {
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  padding: 1rem;
  margin: 2rem 0;

  &.fail {
    background-color: #ff8c69;
  }

  &.congratulation {
    background-color: #8fbc8f;
  }

  &__login {
    text-align: center;
  }

  &__detail {
    display: flex;
    justify-content: space-between;
    padding: .5rem;

    &-fail {
      text-align: center;
      font-weight: 900;
      text-transform: uppercase;
      color: #FF0000;
    }
  }
}
</style>