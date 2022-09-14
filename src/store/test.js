import { toFill } from "@/utils";

export const test = {
  namespaced: true,
  state: {
    answers: null,
    isTesting: false
  },
  mutations: {
    saveAnswers(state, answers) {
      state.answers = answers;
    }
  },
  actions: {
    // createTest(answers) {
    //
    // },
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