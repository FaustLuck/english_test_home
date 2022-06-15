<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div v-else :class="{ fail: timerSec === 0 }">
    <header
      :class="{
        warning: timerSec > 10 && timerSec < 31,
        alert: timerSec < 11 && timerSec > 0,
      }"
    >
      <start-button></start-button>
      <span>{{ timerString }}</span>
      <div></div>
    </header>
    <div v-if="readyToTest">
      <difficult-list :questions="test"></difficult-list>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { test } from "@/utils/test";
import StartButton from "@/components/StartButton";
import DifficultList from "@/components/DifficultList";

export default {
  name: "TestPage",
  components: {
    DifficultList,
    // CardItem,
    StartButton,
  },
  data() {
    return {
      timerString: "",
      timerSec: 0,
      timerStart: 0,
      counterId: "",
      loading: true,
      test: {},
    };
  },
  watch: {
    timerSec: function (value) {
      this.timerString = this.timeToString(value);
      if (!value) this.cancel();
    },
    settings: function (value) {
      if (!value?.timer) return;
      this.loading = false;
      this.timerSec = this.timerStart = value.timer.min * 60 + value.timer.sec;
    },
    readyToTest: function (value) {
      value ? this.begin() : this.cancel();
    },
  },
  async created() {
    this.$store.dispatch("settings/getSettings");
  },
  computed: {
    ...mapState("settings", ["settings"]),
    ...mapState(["readyToTest", "answers"]),
    ...mapState("authorization", ["displayName"]),
  },
  methods: {
    timeToString(value) {
      let sec = (value % 60).toString().padStart(2, "0");
      let min = (value - sec) / 60;
      return `${min}:${sec}`;
    },
    begin() {
      let answers;
      [this.test, answers] = test.create(this.settings);
      this.timerSec = this.timerStart;
      this.$store.commit("SAVE_ANSWERS", answers);
      this.start();
    },
    cancel() {
      clearInterval(this.counterId);
      let timeSpent = this.timeToString(this.timerStart - this.timerSec);
      let reason =
        this.timerStart - this.timerSec ? "Тест завершен" : "Время истекло";
      let data = test.cancel(this.answers, timeSpent, reason, this.settings);
      console.log(data);
      this.$store.dispatch("saveAnswers", data);
      this.$store.dispatch("changeReady", false);
      if (this.timerSec) {
        this.$router.push("result");
      } else {
        setTimeout(() => {
          this.$router.push("result");
        }, 2500);
      }
    },
    start() {
      this.counterId = setInterval(() => {
        this.timerSec--;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.question {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  font-size: 2rem;
  margin: -1px;
  border: 1px solid black;
  padding: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: flex-start;
  }
}

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