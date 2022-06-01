import { createStore } from 'vuex'

import { ref, get, set } from "firebase/database";
import { realtime } from '@/main'
import { statistic } from "@/store/statistic";
import { authorization } from "@/store/authorization";

export default createStore({
  state: {
    settings: null,
    answer: null
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data
    },
    SAVE_ANSWER(state, data) {
      state.answer = data
    }
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
    }
  },
  getters: {
    getSettings: state => state.settings,
    getOrder: state => state.settings.order,
    getAnswer: state => state.answer,
    getSpeech: state => state.settings.speech
  },
  modules: {
    statistic,
    authorization
  }
})
