import { firebaseRealtime } from "@/main";
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
    saveSettings(state, settingsData) {
      state.settings = settingsData;
    },
    saveTimer(state, timerData) {
      state.settings.timer = timerData;
    }
  },
  actions: {
    async requestSettings({commit}) {
      const dbRef = ref(firebaseRealtime, "/settings");
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let settingsData = snapshot.val();
          commit("saveSettings", settingsData);
        } else {
          console.log("No data available");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async requestTimer({commit}) {
      const dbRef = ref(firebaseRealtime, "/settings/timer");
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let timerData = snapshot.val();
          commit("saveTimer", timerData);
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