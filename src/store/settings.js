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
  },
  mutations: {
    saveSettings(state, settings) {
      Object.assign(state, settings);
    },
    addItem(state, {difficult, item}) {
      item.included = true;
      state.dictionary[difficult].push(item);
      state.dictionary[difficult].sort((prev, next) => prev.question < next.question ? -1 : 1);
    },
    startEdit(state, {index, difficult}) {
      Object.assign(state, {editingIndex: index, editingDifficult: difficult});
      state.editingItem = {...state.dictionary[difficult][index]};
    },
    clearEdit(state) {
      state.editingIndex = null;
      state.editingDifficult = null;
      state.editingItem = null;
    },
    cancelEdit(state, {index, difficult}) {
      const {oldAnswer, oldQuestion} = state.dictionary[difficult][index];
      state.dictionary[difficult][index].answer = oldAnswer;
      state.dictionary[difficult][index].question = oldQuestion;
      delete state.dictionary[difficult][index].edited;
    },
    deleteItem(state, {index, difficult}) {
      let item = state.dictionary[difficult][index];
      if (item?.included) {
        state.dictionary[difficult].splice(index, 1);
      } else item.excluded = true;
    },
    removeIncluded(state, {index, difficult}) {
      state.dictionary[difficult].splice(index, 1);
    },
    returnDeletedItem(state, {index, difficult}) {
      let item = state.dictionary[difficult][index];
      delete item.excluded;
    },
    editItem(state) {
      const newItem = state.editingItem;
      const item = state.dictionary[state.editingDifficult][state.editingIndex];
      item.edited = true;
      if (!item?.oldAnswer) item.oldAnswer = item.answer;
      if (!item?.oldQuestion) item.oldQuestion = item.question;
      Object.assign(item, newItem);
    },
    changeSaved(state, flag) {
      state.isSaved = flag;
      window.onbeforeunload = (flag) ? null : () => false;
    }
  },
  actions: {
    async getSettings({commit}, {sub}) {
      const data = await request(`getSettings/${sub}`, null, "GET");
      commit("saveSettings", data);
    },
    async addItem({commit, dispatch}, {difficult, item}) {
      const isNew = await dispatch("checkItem", {difficult, item});
      if (!isNew) return;
      commit("changeSaved", false);
      commit("addItem", {difficult, item});
    },
    checkItem({state}, {difficult, item}) {
      for (let field in item) {
        item[field] = item[field][0].toUpperCase() + item[field].substr(1, item[field].length);
      }
      const index = state.dictionary[difficult].findIndex(el => el.question === item.question || el.answer === item.answer);
      return index === -1;
    },
    deleteItem({commit}, {index, difficult}) {
      commit("changeSaved", false);
      commit("deleteItem", {index, difficult});
    },
    async finishEdit({commit, dispatch}) {
      const isChanged = await dispatch("isChanged");
      if (isChanged) {
        commit("changeSaved", false);
        commit("editItem");
      }
      commit("clearEdit");
    },
    isChanged({state}) {
      const newItem = state.editingItem;
      const oldItem = state.dictionary[state.editingDifficult][state.editingIndex];
      return newItem.question !== oldItem.question || newItem.answer !== oldItem.answer;
    },
    async saveChanges({commit, dispatch}/*, sub*/) {
      const changes = await dispatch("assembleChanges");
      console.log(changes);
      // await request("saveChanges", {sub, changes});
      commit("changeSaved", true);
      // await dispatch("getSettings", {sub});
    },
    assembleChanges({state}) {
      let output = {};
      for (let difficult in state.dictionary) {
        let filter = state.dictionary[difficult].filter(el => el.included || el.edited || el.excluded);
        if (!filter.length) continue;
        output[difficult] = filter;
        output[difficult] = output[difficult].map(el => {
          if (el?.excluded) {
            delete el.edited;
            delete el.included;
          }
          if (el?.edited) {
            delete el.oldAnswer;
            delete el.oldQuestion;
          }
          let tmp = [el?.key];
          if (el?.included || el?.edited) tmp.push(el.question, el.answer);
          return tmp;
        });
      }
      return output;
    }
  }
};