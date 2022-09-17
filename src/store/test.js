import { toFill } from "@/utils";

export const test = {
  namespaced: true,
  state: {
    answers: null,
    isTesting: false,
    timeSpent: null,
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
    },
    changeTestStatus(state, isTesting) {
      state.isTesting = isTesting;
    },
    saveChoice(state, {choice, question, difficult}) {
      let i = state.answers[difficult].findIndex(el => el.question === question);
      state.answers[difficult][i].choice = choice;
    }
  }
};