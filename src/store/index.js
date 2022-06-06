import { createStore } from "vuex";

import { statistic } from "@/store/statistic";
import { authorization } from "@/store/authorization";
import { settings } from "@/store/settings";
import { getDate } from "@/utils";

export default createStore({
  state: {
    answer: null,
    time: null,
    date: null,
    readyToTest: false,
  },
  mutations: {
    SAVE_ANSWER(state, data) {
      state.answer = data;
      [state.date, state.time] = getDate();
    },
    SET_READY(state, data) {
      state.readyToTest = data;
    },
  },
  actions: {
    changeReady({ commit }, data) {
      commit("SET_READY", data);
    },
  },
  getters: {
    getAnswer: (state) => state.answer,
    getTime: (state) => [state.date, state.time],
  },
  modules: {
    statistic,
    authorization,
    settings,
  },
});
