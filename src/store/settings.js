import { get, ref, set } from "firebase/database";
import { realtime } from "@/main";
import { capitalizeFirstLetter, compare } from "@/utils";

export const settings = {
  namespaced: true,
  state: {
    settings: {
      speech: null,
    },
  },
  mutations: {
    SAVE_SETTINGS(state, data) {
      state.settings = data;
    },
    EDIT_RECORD(state, { difficult, index, record, prop }) {
      state.settings.dictionary[difficult][index][prop] = record;
    },
    DELETE_RECORD(state, { difficult, item }) {
      state.settings.dictionary[difficult] = state.settings.dictionary[
        difficult
      ].filter((e) => e.question !== item.question);
    },
    ADD_RECORD(state, { difficult, item }) {
      if (!item.question || !item.answer) return;
      item.question = capitalizeFirstLetter(item.question);
      item.answer = capitalizeFirstLetter(item.answer);
      let index = state.settings.dictionary[difficult].findIndex(
        (e) => e.question === item.question
      );
      if (index > -1) return;
      state.settings.dictionary[difficult].push(item);
      state.settings.dictionary[difficult].sort(compare);
    },
    SAVE_LIMIT(state, { difficult, limit }) {
      state.settings.limits[difficult] = limit;
    },
  },
  actions: {
    async getSettings({ commit }) {
      const dbRef = ref(realtime, `settings/`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit("SAVE_SETTINGS", data);
      } else {
        console.log("No data available");
      }
    },
    async setSettings({ commit }, data) {
      const dbRef = ref(realtime, `settings/`);
      await set(dbRef, data);
      commit("SAVE_SETTINGS", data);
    },
  },
  getters: {
    getSpeech: (state) => state.settings.speech,
    getSettings: (state) => state,
  },
};