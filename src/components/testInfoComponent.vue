<template>
  <section class="info"
           :class="{    fail:isFail && mode!=='result' && !displayMode,
    congratulation:isCongratulation && mode!=='result' && !displayMode  }"
           @click="changeDisplayMode"
  >
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
    <div v-if="displayMode>0">
      <test-difficult-component
        v-for="difficult of orderDifficult"
        :key="difficult"
        :difficult="difficult"
        :part-answers="displayMode===1?filterTest(difficult):result[difficult]"
      ></test-difficult-component>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { getDate } from "@/utils/getDate";

export default {
  name: "testInfoComponent",
  components: {
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent"))
  },
  props: {
    timestamp: Number,
    date: String,
    time: String,
    heightTitle: Number
  },
  data() {
    return {
      localDate: "",
      localTime: "",
      displayMode: 0
    };
  },
  computed: {
    ...mapState("auth", ["displayName", "isLogin"]),
    ...mapState("test", ["timeSpent", "result"]),
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
      return (Object.values(this.result)).reduce((acc, cur) => acc + cur.length, 0);
    },
    correctAnswers() {
      return (Object.values(this.result)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el?.choice).length;
      }, 0);
    },
    timeSpentToString() {
      let sec = (this.timeSpent % 60).toString().padStart(2, "0");
      let min = (this.timeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    isCongratulation() {
      return this.lengthAnswers === this.correctAnswers;
    },
    isFail() {
      return (this.timerStart === this.timeSpent);
    },
  },
  methods: {
    changeDisplayMode(e) {
      if (this.mode==='result') return;
      this.displayMode++;
      if (this.displayMode > 2) this.displayMode = 0;
      if ((this.isCongratulation || !this.correctAnswers) && this.displayMode === 1) this.displayMode = 2;
      if (this.displayMode === 0) return;
      let el = e.target.closest(".info");
      setTimeout(() => this.scroll(el), 0);
    },
    scroll(el) {
      let top = el.getBoundingClientRect().top;
      if (top !== this.heightTitle && this.displayMode > 0) {
        window.scrollBy({
          top: top - this.heightTitle,
          behavior: "smooth"
        });
      }
    },
    filterTest(difficult) {
      return this.result[difficult].filter(el => el.answer !== el.choice);
    }
  },
  created() {
    if (this.isCongratulation) this.$emit("show", "fire");
    if (this.isFail) this.$emit("show", "fail");
    [this.localDate, this.localTime] = (this.mode === "result") ? getDate(this.timestamp) : [this.date, this.time];
    if (this.mode === "result") this.displayMode = 2;
  }
};
</script>

<style scoped lang="scss">
.info {
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  padding: 1rem;
  margin: 2rem 0;

  @media screen and (max-width: 768px) {
    padding: 1rem 0;
  }

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
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

    &-fail {
      text-align: center;
      font-weight: 900;
      text-transform: uppercase;
      color: #FF0000;
    }
  }
</style>