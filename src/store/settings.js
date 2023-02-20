import { request } from "@/utils/utils";

export const settings = {
  namespaced: true,
  state: {
    dictionary: null,
    limits: null,
    timer: null,
    variants: null
  },
  mutations: {
    saveSettings(state, settings) {
      Object.assign(state, settings);
    }
  },
  actions: {
    async getSettings({commit}, {sub}) {
      const data = await request(`getSettings/${sub}`, null, "GET");
      commit("saveSettings", data);
    }
  }
};