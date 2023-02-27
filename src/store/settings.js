import { request } from "@/utils/utils";

export const settings = {
  namespaced: true,
  state: {
    dictionary: null,
    limits: null,
    timer: null,
    variants: null,
    isSaved: true,
    editingIndex: null,
    editingDifficult: null,
    excluded: {},
    included: {}
  },
  mutations: {
    saveSettings(state, settings) {
      Object.assign(state, settings);
    },
    startEditItem(state, {editingIndex, editingDifficult}) {
      Object.assign(state, {editingIndex, editingDifficult});
    },
    cancelEditItem(state) {
      state.editingIndex = null;
      state.editingDifficult = null;
    },
    deleteItem(state, {index, difficult}) {
      state.isSaved=false
      if (!state.excluded[difficult]?.length) state.excluded[difficult] = [];
      let item = state.dictionary[difficult][index];
      item.excluded = true;
      state.excluded[difficult].push(item);
      state.dictionary[difficult].splice(index, 1);
      state.excluded[difficult].sort((prev, next) => prev.question > next.question ? 1 : -1);
    },
    returnDeletedItem(state,{index,difficult}){
      index-=state.dictionary[difficult].length;
      let item = state.excluded[difficult][index];
      delete item.excluded
      state.excluded[difficult].splice(index,1)
      state.dictionary[difficult].push(item);
      state.dictionary[difficult].sort((prev, next) => prev.question > next.question ? 1 : -1);
    }
  },
  actions: {
    async getSettings({commit}, {sub}) {
      const data = await request(`getSettings/${sub}`, null, "GET");
      commit("saveSettings", data);
    }
  }
};