import { createStore } from "vuex";

import { statistic } from "@/store/statistic";
import { authorization } from "@/store/authorization";
import { settings } from "@/store/settings";

import { ref, set } from "firebase/database";
import { realtime } from "@/main";

export default createStore({
  state: {
    answers: {},
    readyToTest: false,
    mode: "",
  },
  mutations: {
    SAVE_ANSWERS(state, data) {
      state.answers = data;
    },
    SAVE_READY(state, data) {
      state.readyToTest = data;
    },
    UPDATE_ANSWER(state, { answer, difficult, index }) {
      state.answers[difficult][index].answer = answer;
    },
  },
  actions: {
    changeReady({ commit }, data) {
      commit("SAVE_READY", data);
    },
    saveAnswers({ commit }, answers) {
      commit("SAVE_ANSWERS", answers);
    },
    async setAnswer({ state }, { uid }) {
      let data = { ...state.answers };
      let date = Object.keys(data)[0];
      let time = Object.keys(data[date])[0];
      data = data[date][time];
      const dbRef = ref(realtime, `users/${uid}/statistic/${date}/${time}`);
      await set(dbRef, data);
    },
  },
  getters: {
    getAnswer: (state) => state.answers,
  },
  modules: {
    statistic,
    authorization,
    settings,
  },
});
