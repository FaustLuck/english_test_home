import { createStore } from 'vuex'

import { ref, get, set } from "firebase/database";
import { realtime } from '@/main'
import { statistic } from "@/store/statistic";
import { authorization } from "@/store/authorization";

export default createStore({
  state: {
    settings: null,
    order: ['easy', 'medium', 'hard'],
    answer: null,
    login: false,
    speech: null
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data
    },
    SAVE_ANSWER(state, data) {
      state.answer = data
    },
    LOGIN(state, login) {
      state.login = login
    },
    SAVE_SPEECH(state, data) {
      state.speech = data
    },
  },
  actions: {
    async getSettings({ commit }) {
      const dbRef = ref(realtime, `settings/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let settings = snapshot.val();
        commit('SAVE_SETTINGS', settings)
      } else {
        console.log("No data available");
      }
    },
    async setSettings({ commit }, settings) {
      const dbRef = ref(realtime, `settings/`);
      await set(dbRef, settings)
      commit('SAVE_SETTINGS', settings)
    },
    async getSpeech({ commit }) {
      const dbRef = ref(realtime, `speech/`)
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let speech = await snapshot.val();
        commit('SAVE_SPEECH', speech)
      }
    },
  },
  getters: {
    getSettings: state => state.settings,
    getOrder: state => state.order,
    getAnswer: state => state.answer,
    getLogin: state => state.login,
    getSpeech: state => state.speech
  },
  modules: {
    statistic,
    authorization
  }
})
