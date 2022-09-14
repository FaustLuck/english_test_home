import { toFill } from "@/utils";

export const test = {
  namespaced: true,
  state: {
    answers: null,
    isTesting: false,
    timeSpent: null,
  },
  mutations: {
    saveAnswers(state, answers) {
      state.answers = answers;
    },
    saveTimeSpent(state, timeSpent) {
      state.timeSpent = timeSpent;
    },
    changeTestStatus(state, isTesting) {
      state.isTesting = isTesting;
    }
  },
  actions: {
    prepareAnswers({commit}, {dictionary, limits}) {
      let answers = {};
      for (let difficult in dictionary) {
        answers[difficult] = toFill(dictionary[difficult], limits[difficult]);
      }
      commit("saveAnswers", answers);
    },
  },
  getters: {}
};