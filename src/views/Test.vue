<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <form v-else>
    <header>
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
  </form>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
export default {
  name: "TestPage",
  components: {
    CardItem,
  },
  data() {
    return {
      settings: {},
      path: "settings",
      timerString: "",
      timerSec: 0,
      timerStart: 0,
      counterId: "",
      loading: true,
      ready: false,
      test: {},
      order: [],
      answers: {},
      reason: "",
    };
  },
  watch: {
    timerSec: function (value) {
      this.timerString = this.timeToString(value);
      if (!value) this.cancelTest();
    },
  },
  async mounted() {
    let settingsStore = this.$store.getters.getInfo(this.path);
    this.settings = Object.keys(settingsStore).length
      ? settingsStore
      : await this.$store.dispatch("fetchData", { path: this.path });
    this.loading = false;
    this.timerSec = this.timerStart =
      this.settings.timer.min * 60 + this.settings.timer.sec;
    this.order = this.$store.getters.getInfo("order");
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
        questionsOfDifficult = questionsOfDifficult.sort(this.compare);
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
    compare(a, b) {
      if (a.question < b.question) return -1;
      if (a.question > b.question) return 1;
      return 0;
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
      this.ready = false;
      let [date, time] = this.getDate();
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
        congratulations: correctAnswers == questions,
        reason,
        "time spent": this.timeToString(this.timerStart - this.timerSec),
        questions,
        correctAnswers,
      };
      this.$store.dispatch("setStatistic", { data: obj, date, time });
    },
    countdown() {
      this.counterId = setInterval(() => {
        this.timerSec--;
      }, 1000);
    },
    getRandom(array) {
      let item = array[Math.floor(Math.random() * array.length)];
      return item;
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
          return e.question != item.question;
        }
        return e != item;
      });
    },
    toFillVariants(limit, questions, dictionary) {
      for (let i = 0; i < limit; i++) {
        let question = { ...questions[i] };
        let correctAnswer = question.answer;
        let variants = this.toFill(
          dictionary.map((e) => e.answer).filter((e) => e != correctAnswer),
          this.settings.variants - 1
        );
        variants.push(correctAnswer);
        variants.sort();
        let index = variants.findIndex((e) => e == correctAnswer);
        variants[index] = {
          answer: correctAnswer,
          correct: true,
        };
        question.answer = variants;
        questions[i] = { ...question };
      }
      return questions;
    },
    updateAnswers({ answer, difficult, index }) {
      this.answers[difficult][index] = answer;
    },
    getDate() {
      return new Intl.DateTimeFormat("ru-Ru", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(new Date())
        .replaceAll(".", "-")
        .split(", ");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;

  & > * {
    width: 30%;
    text-align: center;
  }

  input[type="button"] {
    font-size: 2rem;
    font-family: "serif";
  }
}
</style>