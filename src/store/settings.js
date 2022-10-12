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
    async requestSettings({commit, state}) {
      if (Object.keys(state.settings).length > 2) return true;
      const dbRef = ref(firebaseRealtime, "/settings");
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let settingsData = snapshot.val();
          commit("saveSettings", settingsData);
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async requestTimer({commit, state}) {
      if (state.settings.timer) return true;
      const dbRef = ref(firebaseRealtime, "/settings/timer");
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let timerData = snapshot.val();
          commit("saveTimer", timerData);
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  },
  getters: {
    getSpeech: (state) => state.settings.speech,
    getTimer: (state) => state.settings.timer
  }
};