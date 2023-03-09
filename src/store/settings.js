import { request } from "@/utils/utils";

export const settings = {
  namespaced: true,
  state: {
    dictionary: undefined,
    limits: undefined,
    timer: undefined,
    variants: undefined,
    isSaved: true,
    editingIndex: undefined,
    editingDifficult: undefined,
    editingItem: undefined,
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
      let item = state.dictionary[state.editingDifficult][state.editingIndex];
      if (newItem?.oldAnswer === newItem.answer && newItem.oldQuestion === newItem.question) {
        delete newItem.edited;
        delete newItem.oldQuestion;
        delete newItem.oldAnswer;
        item = newItem;
      } else {
        item.edited = true;
        if (!item?.oldAnswer) item.oldAnswer = item.answer;
        if (!item?.oldQuestion) item.oldQuestion = item.question;
        Object.assign(item, newItem);
      }
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
      const index = state.dictionary[difficult].findIndex(el => el.question === item.question || el.answer === item.answer);
      return index === -1;
    },
    deleteItem({commit}, {index, difficult}) {
      commit("changeSaved", false);
      commit("deleteItem", {index, difficult});
    },
    saveTimer({commit, state}, {timer}) {
      commit("changeSaved", false);
      state.timer = timer;
    },
    saveVariants({commit, state}, {variants}) {
      commit("changeSaved", false);
      state.variants = variants;
    },
    saveLimits({commit, state}, {difficult, limit}) {
      commit("changeSaved", false);
      state.limits[difficult] = limit;
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
    async saveChanges({commit, dispatch, state}, sub) {
      const {limits, timer, variants} = state;
      const editedDictionary = await dispatch("assembleChanges");
      await request("saveChanges", {sub, editedDictionary,limits, timer, variants});
      await dispatch("getSettings", {sub});
      const data = await request(`getSettings/${sub}`, null, "GET");
      commit("changeSaved", true);
      commit("saveSettings", data);
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
          let tmp = [];
          tmp[0] = el.key ?? null;
          if (el?.included || el?.edited) tmp.push(el.question, el.answer);
          return tmp;
        });
      }
      return output;
    }
  }
};