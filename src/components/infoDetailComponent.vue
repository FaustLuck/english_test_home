<template>
  <section class="info">
    <div v-if="mode==='result'" class="info__login">{{ (isLogin) ? displayName : "Вход не выполнен" }}</div>
    <div class="info__detail">
      <span>Время тестирования:</span>
      <span>{{ date }} {{ time }} </span>
    </div>
    <div class="info__detail">
      <span>Кол-во верных ответов / вопросов:</span>
      <span>{{ correctAnswers }} / {{ lengthAnswers }}</span>
    </div>
    <div class="info__detail">
      <span>Времени затрачено:</span>
      <span>{{ timeSpentToString }}</span>
    </div>
    <div class="info__detail-fail" v-if="isFail">
      <span>Время вышло!</span>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "infoDetailComponent",
  props: {
    timestamp: Number,
    answers: Object,
    timeSpent: Number
  },
  data() {
    return {
      date: "",
      time: ""
    };
  },
  computed: {
    ...mapState("auth", ["displayName", "isLogin"]),
    ...mapGetters("settings", ["getTimer"]),
    timerStart() {
      if (!this.getTimer) return;
      let {min, sec} = this.getTimer;
      return min * 60 + sec;
    },
    mode() {
      return this.$route.name;
    },
    lengthAnswers() {
      return (Object.values(this.answers)).reduce((acc, cur) => acc + cur.length, 0);
    },
    correctAnswers() {
      return (Object.values(this.answers)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el.choice).length;
      }, 0);
    },
    timeSpentToString() {
      let sec = (this.timeSpent % 60).toString().padStart(2, "0");
      let min = (this.timeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    isFail() {
      return (this.timerStart === this.timeSpent);
    },
  },
  methods: {
    getDate(timestamp) {
      return new Intl.DateTimeFormat("ru-Ru", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(new Date(timestamp))
        .split(", ");
    }
  },
  created() {
    if (this.lengthAnswers === this.correctAnswers) this.$emit("congratulation");
    [this.date, this.time] = this.getDate(this.timestamp);
  }
};
</script>

<style scoped lang="scss">
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

    &-fail {
      text-align: center;
      font-weight: 900;
      text-transform: uppercase;
      color: #FF0000;
    }
  }
}
</style>