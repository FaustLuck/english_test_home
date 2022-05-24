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
      <div v-for="difficult of order" :key="difficult">
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
import {mapState} from "vuex";
import {compare} from '@/utils'

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
      if (!value) return;
      this.loading = false;
      this.timerSec = this.timerStart =
        this.settings.timer.min * 60 + this.settings.timer.sec;
    },
  },
  async created() {
    this.$store.dispatch("getSettings");
    this.$store.dispatch("getSpeech");
  },
  computed: {
    ...mapState(["settings", "order"])
  },
  methods: {
    timeToString(value) {
      let sec = (value % 60).toString().padStart(2, "0");
      let min = (value - sec) / 60;
      return `${min}:${sec}`;
    },
    createTest() {
      this.test = {};
      for (let difficult of this.order) {
        let dictionaryOfDifficult = this.settings.dictionary[difficult];
        let questionsOfDifficult = this.toFill(
          dictionaryOfDifficult,
          this.settings.tests[difficult]
        );
        questionsOfDifficult = questionsOfDifficult.sort(compare);
        questionsOfDifficult = this.toFillVariants(
          this.settings.tests[difficult],
          questionsOfDifficult,
          dictionaryOfDifficult
        );
        this.test[difficult] = questionsOfDifficult;
      }
      this.prepareAnswers();
      this.ready = true;
      this.timerSec = this.timerStart;
      this.countdown();
    },
    prepareAnswers() {
      this.answers = {};
      for (let difficult of this.order) {
        let tmp = [];
        for (let item of this.test[difficult]) {
          let index = item.answer.findIndex((e) => e instanceof Object);
          tmp.push({
            question: item.question,
            answer: [
              {
                answer: "Не выбрано",
                correct: false,
              },
              item.answer[index].answer,
            ],
          });
        }
        this.answers[difficult] = tmp;
      }
    },
    cancelTest() {
      clearInterval(this.counterId);
      let questions = Object.values(this.answers).reduce(
        (prev, cur) => prev + cur.length,
        0
      );
      let correctAnswers = 0;
      for (let difficult of this.order) {
        correctAnswers += this.answers[difficult].reduce(
          (prev, cur) => prev + cur.answer.length,
          0
        );
      }
      let reason =
        this.timerStart - this.timerSec ? "Тест завершен" : "Время истекло";
      correctAnswers = questions * 2 - correctAnswers;
      let obj = {
        answers: this.answers,
        congratulations: correctAnswers === questions,
        reason,
        "time spent": this.timeToString(this.timerStart - this.timerSec),
        questions,
        correctAnswers,
      };
      this.$store.dispatch("setStatistic", obj);
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
    countdown() {
      this.counterId = setInterval(() => {
        this.timerSec--;
      }, 1000);
    },
    getRandom(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    toFill(array, limit) {
      let output = [];
      let tmp = [...array];
      for (let i = 0; i < limit; i++) {
        let item = this.getRandom(tmp);
        output.push(item);
        tmp = this.deleteRepeat(item, tmp);
      }
      return output;
    },
    deleteRepeat(item, array) {
      return array.filter((e) => {
        if (item instanceof Object) {
          return e.question !== item.question;
        }
        return e !== item;
      });
    },
    toFillVariants(limit, questions, dictionary) {
      for (let i = 0; i < limit; i++) {
        let question = {...questions[i]};
        let correctAnswer = question.answer;
        let variants = this.toFill(
          dictionary.map((e) => e.answer).filter((e) => e !== correctAnswer),
          this.settings.variants - 1
        );
        variants.push(correctAnswer);
        variants.sort();
        let index = variants.findIndex((e) => e === correctAnswer);
        variants[index] = {
          answer: correctAnswer,
          correct: true,
        };
        question.answer = variants;
        questions[i] = {...question};
      }
      return questions;
    },
    updateAnswers({answer, difficult, index}) {
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