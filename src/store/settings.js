import { get, ref, set } from "firebase/database";
import { realtime } from "@/main";

export const settings = {
  namespaced: true,
  state: {
    settings: {
      order: null,
      speech: null
    }
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data
    },
    SAVE_ORDER(state, data) {
      state.settings.order = data
    },
  },
  actions: {
    async getSettings({ commit }) {
      const dbRef = ref(realtime, `settings/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_SETTINGS', data)
        return true
      } else {
        console.log("No data available");
        return false
      }
    },
    async setSettings({ commit }, data) {
      const dbRef = ref(realtime, `settings/`);
      await set(dbRef, data)
      commit('SAVE_SETTINGS', data)
    },
    async getOrder({ commit, getters }) {
      if (getters.getOrder?.length > 0) return
      const dbRef = ref(realtime, `settings/order/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_ORDER', data)
      } else {
        console.log("No data available");
      }
    }
  },
  getters: {
    getOrder: state => state.settings.order,
    getSpeech: state => state.settings.speech,
    getSettings: state => state
  },
}