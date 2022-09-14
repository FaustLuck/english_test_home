import { realtime } from "@/main";
import { ref, get } from "firebase/database";

export const settings = {
  namespaced: true,
  state: {
    settings: {
      speech: null,
      timer: null
    }
  },
  mutations: {
    saveSettings(state, settings) {
      state.settings = settings;
    }
  },
  actions: {
    async getSettings({commit}) {
      const dbRef = ref(realtime, "/settings");
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let settings = snapshot.val();
          commit("saveSettings", settings);
        } else {
          console.log("No data available");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    getSpeech: (state) => state.settings.speech,
    getTimer: (state) => state.settings.timer
  }
};