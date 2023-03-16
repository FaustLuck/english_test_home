<template>
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
    <item-preloader v-if="displayMode>0 && !localTest"></item-preloader>
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
import { defineAsyncComponent } from "vue";
import { getDate } from "@/utils/utils";
import { mapActions, mapState } from "pinia/dist/pinia";
import { authStore } from "@/store/authStore";
import { statisticStore } from "@/store/statisticStore";
import { testStore } from "@/store/testStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "testInfoComponent",
  components: {
    itemPreloader: defineAsyncComponent(() => import("@/components/itemPreloader.vue")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue")),
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent.vue"))
  },
  props: {
    timestamp: Number,
    testInfo: Object,
    sub: String,
    heightTitle: Number
  },
  data() {
    return {
      displayMode: 0,
      date: 0,
      time: 0,
      localTest: null,
      localTimeSpent: this.testInfo?.timeSpent,
      localTimeLeft: this.testInfo?.timeLeft
    };
  },
  watch: {
    result(value) {
      if (value && this.mode === "result") {
        this.localTest = this.result;
        this.localTimeSpent = this.timeSpent;
        this.localTimeLeft = this.timeLeft;
        if (this.isCongratulation) this.$emit("show", "fire");
        if (this.isFail) this.$emit("show", "fail");
        this.setLoading(false);
      }
    },
    async sub(value) {
      if (value) await this.saveTest({sub: value});
    },
  },
  computed: {
    ...mapState(testStore, ["timeSpent", "result", "timeLeft"]),
    ...mapState(mainStore, ["orderDifficult", "isLoading", "mode"]),
    ...mapState(authStore, ["name"]),
    length() {
      if (this.mode === "result") {
        return (Object.values(this.result)).reduce((acc, cur) => acc + cur.length, 0);
      }
      return this.testInfo?.questions;
    },
    correct() {
      if (this.mode === "result") return (Object.values(this.result)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el?.choice).length;
      }, 0);
      return this.testInfo?.correct;
    },
    timeSpentToString() {
      let sec = (this.localTimeSpent % 60).toString().padStart(2, "0");
      let min = (this.localTimeSpent - sec) / 60;
      return `${min}:${sec}`;
    },
    isCongratulation() {
      return this.length === this.correct;
    },
    isFail() {
      return this.localTimeLeft === 0;
    },
  },
  methods: {
    ...mapActions(statisticStore, ["getResult"]),
    ...mapActions(testStore, ["checkTest", "saveTest"]),
    ...mapActions(mainStore, ["setLoading"]),
    async changeDisplayMode(e) {
      if (this.mode === "result" && !this.localTest) return;
      this.displayMode++;
      if (this.displayMode > 2) this.displayMode = 0;
      if ((this.isCongratulation || !this.correct) && this.displayMode === 1) this.displayMode = 2;
      if (this.displayMode === 0) return;
      await this.getResultFromBD();
      let el = e.target.closest(".info");
      setTimeout(() => this.scroll(el), 0);
    },
    async getResultFromBD() {
      if (this.localTest) return;
      this.localTest = await this.getResult(this.sub, this.timestamp);
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
      return this.localTest[difficult].filter(el => el.answer !== el?.choice);
    }
  },
  async mounted() {
    [this.date, this.time] = getDate(this.timestamp);
    if (this.mode === "result") {
      await this.getVerifiedTest(this.sub);
      this.displayMode = 2;
      if (this.sub) await this.saveTest(this.sub);
    }
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