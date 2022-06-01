import { createStore } from 'vuex'

import { statistic } from "@/store/statistic";
import { authorization } from "@/store/authorization";
import { settings } from "@/store/settings";

export default createStore({
  state: {
    answer: null
  },
  mutations: {
    SAVE_ANSWER(state, data) {
      state.answer = data
    }
  },
  getters: {
    getAnswer: state => state.answer,
  },
  modules: {
    statistic,
    authorization,
    settings
  }
})
