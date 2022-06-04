<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div v-else :class="{ fail: timerSec === 0 }">
    <header
      :class="{
        warning: timerSec > 10 && timerSec < 31,
        alert: timerSec < 11 && timerSec > 0,
      }"
    >
      <input
        @click="!ready ? createTest() : cancelTest()"
        type="button"
        :value="ready ? 'Завершить тест' : 'Начать тест'"
      />
      <span>{{ timerString }}</span>
      <div></div>
    </header>
    <div v-if="ready">
      <div v-for="difficult of settings.order" :key="difficult">
        <div v-for="(question, index) of test[difficult]" :key="question">
          <card-item
            :index="index"
            :item="question"
            :mode="'test'"
            :difficult="difficult"
            @updateAnswers="updateAnswers"
          ></card-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CardItem from "@/components/CardItem.vue";
import { mapState } from "vuex";
import { test } from "@/utils/test";

export default {
  name: "TestPage",
  components: {
    CardItem,
  },
  data() {
    return {
      path: "settings",
      timerString: "",
      timerSec: 0,
      timerStart: 0,
      counterId: "",
      loading: true,
      ready: false,
      test: {},
      answers: {},
      reason: "",
    };
  },
  watch: {
    timerSec: function (value) {
      this.timerString = this.timeToString(value);
      if (!value) this.cancelTest();
    },
    settings: function (value) {
      if (!value?.timer) return
      this.loading = false;
      this.timerSec = this.timerStart =
        value.timer.min * 60 + value.timer.sec;
    },
  },
  async created() {
    this.$store.dispatch("settings/getSettings");
  },
  computed: {
    ...mapState('settings', ['settings'])
  },
  methods: {
    timeToString(value) {
      let sec = (value % 60).toString().padStart(2, "0");
      let min = (value - sec) / 60;
      return `${ min }:${ sec }`;
    },
    createTest() {
      [this.test, this.answers] = test.create(this.settings);
      this.ready = true;
      this.timerSec = this.timerStart;
      this.start();

    },
    cancelTest() {
      clearInterval(this.counterId);
      let data = test.cancel(this.answers)
      data.reason = this.timerStart - this.timerSec ? "Тест завершен" : "Время истекло";
      data["time spent"] = this.timeToString(this.timerStart - this.timerSec)
      this.$store.commit("SAVE_ANSWER", data);
      if (this.timerSec) {
        this.ready = false;
        this.$router.push("result");
      } else {
        setTimeout(() => {
          this.ready = false;
          this.$router.push("result");
        }, 10000);
      }
    },
    start() {
      this.counterId = setInterval(() => {
        this.timerSec--;
      }, 1000);
    },
    updateAnswers({ answer, difficult, index }) {
      this.answers[difficult][index] = answer;
    },
  },
};
</script>

<style lang="scss" scoped>
.fail {
  background-color: red;
  pointer-events: none;
}

header {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;

  @media screen and (max-width: 768px) {
    position: sticky;
    top: 5rem;
    z-index: 2;
    background: peachpuff;
  }

  &.warning {
    animation: wave 4s linear alternate infinite;
  }

  &.alert {
    animation: flash 1s linear infinite;
  }

  & > * {
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    & > *:nth-child(3) {
      width: 0;
    }
  }

  input[type="button"] {
    font-size: 2rem;
    font-family: "serif";
    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
}

@keyframes wave {
  from {
    background-color: transparent;
  }

  to {
    background-color: red;
  }
}

@keyframes flash {
  from {
    background-color: red;
  }

  49.9% {
    background-color: red;
  }

  50% {
    background-color: transparent;
  }

  to {
    background-color: transparent;
  }
}
</style>