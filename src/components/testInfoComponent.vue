<template v-slot="heightTitle">
  <preloader-component v-if="isLoading && mode==='result'"></preloader-component>
  <section v-else
           class="info"
           :class="{    fail:isFail && mode!=='result' && !displayMode,
    congratulation:isCongratulation && mode!=='result' && !displayMode  }"
           @click="changeDisplayMode"
  >
    <div v-if="mode==='result'" class="info__login">{{ (name) ? name : "Вход не выполнен" }}</div>
    <div class="info__detail-clickable">
      <div class="info__detail">
        <span>Время тестирования:</span>
        <span>{{ date }} {{ time }} </span>
      </div>
      <div class="info__detail">
        <span>Кол-во верных ответов / вопросов:</span>
        <span>{{ correct }} / {{ length }}</span>
      </div>
      <div class="info__detail">
        <span>Времени затрачено:</span>
        <span>{{ timeSpentToString }}</span>
      </div>
      <div class="info__detail-fail" v-if="isFail && mode==='result'">
        <span>Время вышло!</span>
      </div>
    </div>
        <div v-if="displayMode>0 && localTest">
          <test-difficult-component
            v-for="difficult of orderDifficult"
            :key="difficult"
            :difficult="difficult"
            :part-answers="displayMode===1?filterTest(difficult):localTest[difficult]"
          ></test-difficult-component>
        </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { getDate } from "@/utils/utils";


export default {
  name: "testInfoComponent",
  components: {
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent"))
  },
  props: {
    timestamp: Number,
    testInfo: Object,
    sub: String,
    heightTitle:Number
  },
  data() {
    return {
      displayMode: 0,
      isLoading: true,
      date: 0,
      time: 0,
      localTest: this.result,
      localTimeSpent: this.timeSpent ?? this.testInfo.timeSpent,
      localTimeLeft: this.timeLeft ?? this.testInfo.timeLeft,
      tmp: null
    };
  },
  watch: {
    result(value) {
      if (value) this.isLoading = false;
      if (this.isCongratulation) this.$emit("show", "fire");
      if (this.isFail) this.$emit("show", "fail");
    }
  },
  computed: {
    ...mapState("auth", ["name"]),
    ...mapState("test", ["timeSpent", "result", "timeLeft"]),
    ...mapState(["orderDifficult"]),
    mode() {
      return this.$route.name;
    },
    length() {
      if (this.mode === "result") {
        return (Object.values(this.result)).reduce((acc, cur) => acc + cur.length, 0);
      }
      return this.testInfo.questions;
    },
    correct() {
      if (this.mode === "result") return (Object.values(this.result)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el?.choice).length;
      }, 0);
      return this.testInfo.correct;
    },
    timeSpentToString() {
      let sec = (this.localTimeSpent % 60).toString().padStart(2, "0");
      let min = (this.localTimeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    isCongratulation() {
      const length = this.length ?? this.testInfo.questions;
      const correct = this.correct ?? this.testInfo.correct;
      return length === correct;
    },
    isFail() {
      return this.localTimeLeft === 0;
    },
  },
  methods: {
    ...mapActions("statistic", ["getResult"]),
    changeDisplayMode(e) {
      this.getResultFromBD();
      if (this.mode === "result" && !this.localTest) return;
      this.displayMode++;
      if (this.displayMode > 2) this.displayMode = 0;
      if ((this.isCongratulation || !this.correct) && this.displayMode === 1) this.displayMode = 2;
      if (this.displayMode === 0) return;
      let el = e.target.closest(".info");
      setTimeout(() => this.scroll(el), 0);
    },
    async getResultFromBD() {
      if(this.localTest) return
      this.localTest = await this.getResult({sub: this.sub, timestamp: this.timestamp});
    },
    scroll(el) {
      let top = el.getBoundingClientRect().top;

      if (top !== this.heightTitle && this.displayMode > 0) {
        console.log(top - this.heightTitle)
        window.scrollBy({
          top: top - this.heightTitle,
          behavior: "smooth"
        });
      }
    },
    filterTest(difficult) {
      this.tmp = this.localTest[difficult].filter(el => el.answer !== el?.choice);
      return this.localTest[difficult].filter(el => el.answer !== el?.choice);
    }
  },
  mounted() {
    [this.date, this.time] = getDate(this.timestamp);
    if (this.mode === "result") this.displayMode = 2;
  }
};
</script>

<style scoped lang="scss">
.info {
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  padding: 1rem;
  margin: 1rem 0;

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