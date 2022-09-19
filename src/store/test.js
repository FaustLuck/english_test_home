import { toFill } from "@/utils";

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
      state.timestamp = Date.now();
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
  }
};