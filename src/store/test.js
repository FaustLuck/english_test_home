import { toFill } from "@/utils";
import { loadFirebaseRealtime } from "@/main";

export const test = {
  namespaced: true,
  state: {
    answers: null,
    isTesting: false,
    timeSpent: null,
    timestamp: null,
    timeLeft: null
  },
  mutations: {
    prepareAnswers(state, {dictionary, limits}) {
      let answers = {};
      for (let difficult in dictionary) {
        answers[difficult] = toFill(dictionary[difficult], limits[difficult]);
      }
      state.answers = answers;
    },
    saveTimes(state, timeSpent) {
      state.timeSpent = timeSpent;
      let date = new Date();
      state.timestamp = date.setSeconds(0, 0);
    },
    changeTestStatus(state, isTesting) {
      state.isTesting = isTesting;
    },
    saveChoice(state, {choice, question, difficult}) {
      let i = state.answers[difficult].findIndex(el => el.question === question);
      state.answers[difficult][i].choice = choice;
    },
    saveTimerSec(state, secondsLeft) {
      state.timeLeft = secondsLeft;
    }
  },
  actions: {
    async sendAnswersToDB({state}, {uid}) {
      const firebaseRealtime = await loadFirebaseRealtime();
      const {ref, set} = await import("firebase/database");
      const dbRef = ref(firebaseRealtime, `users/${uid}/statistic/${state.timestamp}`);
      try {
        await set(dbRef, {
          test: state.answers,
          timeSpent: state.timeSpent
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};