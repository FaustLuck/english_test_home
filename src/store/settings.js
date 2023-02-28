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
    editingItem: null,
    excluded: {},
    included: {}
  },
  mutations: {
    saveSettings(state, settings) {
      Object.assign(state, settings);
    },
    addItem(state, {difficult, item}) {
      state.isSaved = false;
      item.included = true;
      state.dictionary[difficult].push(item);
      state.dictionary[difficult].sort((prev, next) => prev.question < next.question ? -1 : 1);
    },
    startEdit(state, {index, difficult}) {
      Object.assign(state, {editingIndex:index, editingDifficult:difficult});
      state.editingItem = {...state.dictionary[difficult][index]};
    },
    clearEdit(state) {
      state.editingIndex = null;
      state.editingDifficult = null;
      state.editingItem = null;
    },
    cancelEdit(state, {index, difficult}) {
      const {oldAnswer, oldQuestion} = state.dictionary[difficult][index];
      state.dictionary[difficult][index] = {
        answer: oldAnswer,
        question: oldQuestion
      };
    },
    deleteItem(state, {index, difficult}) {
      state.isSaved = false;
      if (!state.excluded[difficult]?.length) state.excluded[difficult] = [];
      let item = state.dictionary[difficult][index];
      item.excluded = true;
    },
    returnDeletedItem(state, {index, difficult}) {
      let item = state.dictionary[difficult][index];
      delete item.excluded;
    },
    editItem(state) {
      state.isSaved = false;
      const newItem = state.editingItem;
      const item = state.dictionary[state.editingDifficult][state.editingIndex];
      item.edited = true;
      if (!item?.oldAnswer) item.oldAnswer = item.answer;
      if (!item?.oldQuestion) item.oldQuestion = item.question;
      Object.assign(item, newItem);
    }
  },
  actions: {
    async getSettings({commit}, {sub}) {
      const data = await request(`getSettings/${sub}`, null, "GET");
      commit("saveSettings", data);
    },
    async finishEdit({commit, dispatch}) {
      const isChanged = await dispatch("isChanged");
      if (isChanged) {
        commit("editItem");
      }
      commit("clearEdit");
    },
    isChanged({state}) {
      const newItem = state.editingItem;
      const oldItem = state.dictionary[state.editingDifficult][state.editingIndex];
      return newItem.question !== oldItem.question || newItem.answer !== oldItem.answer;
    }
  }
};