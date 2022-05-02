<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <form v-else>
    <header>
      <input @click="createTest()" type="button" value="Начать тест" />
      <span>{{ timerString }}</span>
      <div></div>
    </header>
    <div v-for="array of test" :key="array">

    </div>
  </form>
</template>

<script>
import LoaderSpinner from "@/components/LoaderSpinner.vue";
//TODO создать компонент, который принимает item в виде объекта
//TODO внутри он обращается к компоненту list-variants, который отрисовывает список вариантов ответа
export default {
  name: "TestPage",
  components: {
    LoaderSpinner,

  },
  data() {
    return {
      settings: {},
      path: "settings",
      timerString: "",
      timerSec: 0,
      loading: true,
      ready: false,
      test: [],
    };
  },
  watch: {
    timerSec: function (newVal) {
      let sec = (newVal % 60).toString().padStart(2, "0");
      let min = (newVal - sec) / 60;
      this.timerString = `${min}:${sec}`;
    },
    ready: function (newVal) {
      if (newVal) this.countdown();
    },
  },
  async mounted() {
    let settingsStore = this.$store.getters.getInfo(this.path);
    this.settings = Object.keys(settingsStore).length
      ? settingsStore
      : await this.$store.dispatch("fetchData", { path: this.path });
    this.loading = false;
    this.timerSec = this.settings.timer.min * 60 + this.settings.timer.sec;
  },
  methods: {
    createTest() {
      let outputTest = [];
      let limitVariants = this.settings.variants;
      for (let [difficult, dictionaryOfDifficult] of Object.entries(
        this.settings.dictionary
      )) {
        let outputTmp = [];
        do {
          let item = this.getRandomQuestion(dictionaryOfDifficult);
          if (this.checkRepeat(outputTmp, item)) continue;
          let tmp = [item];
          do {
            let variant = this.getRandomQuestion(dictionaryOfDifficult);
            if (this.checkRepeat(tmp, variant)) continue;
            tmp.push(variant);
          } while (tmp.length < limitVariants);
          item.answer = tmp.map((e) => e.answer);
          let correctAnswer = item.answer[0];
          item.answer.sort();
          let index = item.answer.findIndex((e) => e == correctAnswer);
          console.log(index);
          item.answer[index] = {
            answer: correctAnswer,
            correct: true,
          };
          outputTmp.push(item);
        } while (outputTmp.length < this.settings.tests[difficult]);
        outputTest.push([...outputTmp]);
      }
      this.test = outputTest;
      this.ready = true;
    },
    countdown() {
      let timerCounter = setInterval(() => {
        this.timerSec--;
        if (!this.timerSec) {
          clearInterval(timerCounter);
        }
      }, 1000);
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
        .split(", ");
    },
    getRandomQuestion(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    createVariants(array, right, count) {
      let arrayOfOptions = [right],
        arrayOfAnswers = [...array].map((el) => el.ru);
      arrayOfAnswers.splice(arrayOfAnswers.indexOf(right), 1);
      while (arrayOfOptions.length < count) {
        let question = arrayOfAnswers.getRandom();
        arrayOfAnswers.splice(arrayOfAnswers.indexOf(question), 1);
        arrayOfOptions.push(question);
      }
      return arrayOfOptions.sort();
    },
    checkRepeat(array, item) {
      return array.includes((e) => e.question == item.question);
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