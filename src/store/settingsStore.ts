import { defineStore } from "pinia";
import { requestGet, requestPost, sendFile } from "@/utils/requests.js";

export const settingsStore = defineStore("settings", {
  state() {
    return {
      dictionary: undefined,
      limits: undefined,
      timer: undefined,
      variants: undefined,
      isSaved: true,
      editingIndex: undefined,
      editingDifficult: undefined,
      editingItem: undefined,
    };
  },
  actions: {
    startEdit(index: number, difficult: string) {
      if (this.dictionary[difficult][index].excluded) return;
      this.editingIndex = index;
      this.editingDifficult = difficult;
      this.editingItem = { ...this.dictionary[difficult][index] };
    },
    clearEdit() {
      this.editingIndex = null;
      this.editingDifficult = null;
      this.editingItem = null;
    },
    cancelEdit(index: number, difficult: string) {
      const { oldAnswer, oldQuestion } = this.dictionary[difficult][index];
      this.dictionary[difficult][index].answer = oldAnswer;
      this.dictionary[difficult][index].question = oldQuestion;
      delete this.dictionary[difficult][index].edited;
    },
    removeIncluded(index: number, difficult: string) {
      this.dictionary[difficult].splice(index, 1);
    },
    returnDeletedItem(index: number, difficult: string) {
      let item = this.dictionary[difficult][index];
      delete item.excluded;
    },
    editItem() {
      const newItem = this.editingItem;
      let item = this.dictionary[this.editingDifficult][this.editingIndex];
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
    changeSaved(flag: boolean) {
      this.isSaved = flag;
      window.onbeforeunload = (flag) ? null : () => false;
    },
    async getSettings(sub: string) {
      const data = await requestGet(`/settings/get/${sub}`);
      Object.assign(this, data);
    },
    async addItem(difficult: string, item) {
      const isNew = this.checkItem(difficult, item);
      if (!isNew) return;
      this.changeSaved(false);
      item.included = true;
      this.dictionary[difficult].push(item);
      this.dictionary[difficult].sort((prev, next) => prev.question < next.question ? -1 : 1);

    },
    checkItem(difficult: string, item) {
      const index = this.dictionary[difficult].findIndex(el => el.question === item.question || el.answer === item.answer);
      return index === -1;
    },
    deleteItem(index: number, difficult: string) {
      this.changeSaved(false);
      let item = this.dictionary[difficult][index];
      if (item?.included) {
        this.dictionary[difficult].splice(index, 1);
      } else item.excluded = true;
    },
    saveTimer(timer: number) {
      this.changeSaved(false);
      this.timer = timer;
    },
    saveVariants(variants: number) {
      this.changeSaved(false);
      this.variants = variants;
    },
    saveLimits(difficult: string, limit: number) {
      this.changeSaved(false);
      this.limits[difficult] = limit;
    },
    async finishEdit() {
      const isChanged = this.isChanged();
      if (isChanged) {
        this.changeSaved(false);
        this.editItem();
      }
      this.clearEdit();
    },
    isChanged() {
      const newItem = this.editingItem;
      const oldItem = this.dictionary[this.editingDifficult][this.editingIndex];
      return newItem.question !== oldItem.question || newItem.answer !== oldItem.answer;
    },
    async saveChanges(sub: string) {
      const { limits, timer, variants } = this;
      const editedDictionary = this.assembleChanges();
      await requestPost("/settings/save", { sub, editedDictionary, limits, timer, variants });
      await this.getSettings(sub);
      this.changeSaved(true);
    },
    assembleChanges() {
      let output = {};
      for (let difficult in this.dictionary) {
        let filter = this.dictionary[difficult].filter(el => el.included || el.edited || el.excluded);
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
    },
    async sendNewDictionary(file: any, flag: string, sub: string) {
      this.changeSaved(false);
      await sendFile(file, flag, sub);
      await this.getSettings(sub);
      this.changeSaved(true);
    },
    async sendNewDictionaryFromClipboard(table: string[][], isOverwrite: boolean, sub: string) {
      this.changeSaved(false);
      const editedDictionary = this.prepareTable(table);
      const { limits, timer, variants } = this;
      await requestPost("/settings/save", { sub, editedDictionary, limits, timer, variants });
      await this.getSettings(sub);
      this.changeSaved(true);
    },
    prepareTable(table: string[][]) {
      let newDictionary = {};
      for (const row of table) {
        const difficult = row[2];
        if (!newDictionary[difficult]?.length) newDictionary[difficult] = [];
        newDictionary[difficult].push([null, row[0], row[1]]);
      }
      return newDictionary;
    },
  }
});