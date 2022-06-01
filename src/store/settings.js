import { get, ref, set } from "firebase/database";
import { realtime } from "@/main";

export const settings = {
  namespaced: true,
  state: {
    settings: null
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data
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
    }
  },
  getters: {
    getOrder: state => state.settings.order,
    getSpeech: state => state.settings.speech
  },
}