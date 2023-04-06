import { defineStore } from "pinia";
import { requestGet, requestPost, sendFile } from "@/utils/requests.js";
import { Dictionary, Limits, Record } from "@/types/dictionary";

interface Settings {
  dictionary: Dictionary | undefined;
  limits: Limits | undefined;
  timer: number | undefined;
  variants: number | undefined;
  isSaved: boolean;
  editingIndex: number | undefined;
  editingDifficult: string | undefined;
  editingItem: Record | undefined;
}

export const settingsStore = defineStore("settings", {
  state(): Settings {
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
      if (!this.dictionary?.[difficult]) return;
      if (this.dictionary[difficult][index].excluded) return;
      this.editingIndex = index;
      this.editingDifficult = difficult;
      this.editingItem = Object.assign(this.dictionary[difficult][index]);
    },
    clearEdit() {
      this.editingIndex = undefined;
      this.editingDifficult = undefined;
      this.editingItem = undefined;
    },
    cancelEdit(index: number, difficult: string) {
      if (!this.dictionary?.[difficult]) return;
      const { oldAnswer, oldQuestion } = this.dictionary[difficult][index];
      if (oldAnswer === undefined || oldQuestion === undefined) return;
      this.dictionary[difficult][index].answer = oldAnswer;
      this.dictionary[difficult][index].question = oldQuestion;
      delete this.dictionary[difficult][index].edited;
    },
    removeIncluded(index: number, difficult: string) {
      if (!this.dictionary?.[difficult]) return;
      this.dictionary[difficult].splice(index, 1);
    },
    returnDeletedItem(index: number, difficult: string) {
      if (!this.dictionary?.[difficult]) return;
      let item = this.dictionary[difficult][index];
      delete item.excluded;
    },
    editItem() {
      if (!this.editingItem) return;
      if (!this.editingDifficult) return;
      if (!this.editingIndex) return;
      if (!this.dictionary?.[this.editingDifficult]) return;
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
    async addItem(difficult: string, item: Record) {
      if (!this.dictionary?.[difficult]) return;
      const isNew = this.checkItem(difficult, item);
      if (!isNew) return;
      this.changeSaved(false);
      item.included = true;
      this.dictionary[difficult].push(item);
      this.dictionary[difficult].sort((prev, next) => prev.question < next.question ? -1 : 1);

    },
    checkItem(difficult: string, item: Record) {
      if (!this.dictionary?.[difficult]) return;
      const index = this.dictionary[difficult].findIndex(el => el.question === item.question || el.answer === item.answer);
      return index === -1;
    },
    deleteItem(index: number, difficult: string) {
      if (!this.dictionary?.[difficult]) return;
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
      if (!this.limits?.[difficult]) return;
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
      if (!this.editingItem) return;
      if (!this.editingDifficult) return;
      if (!this.editingIndex) return;
      if (!this.dictionary?.[this.editingDifficult]) return;
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
      let intermediate: Dictionary = {};
      let output: {
        [index: string]: (string | null)[][]
      } = {};
      for (let difficult in this.dictionary) {
        let filter = this.dictionary[difficult].filter(el => el.included || el.edited || el.excluded);
        if (!filter.length) continue;
        intermediate[difficult] = filter;
        output[difficult] = intermediate[difficult].map(el => {
          if (el?.excluded) {
            delete el.edited;
            delete el.included;
          }
          if (el?.edited) {
            delete el.oldAnswer;
            delete el.oldQuestion;
          }
          let tmp: (string | null)[] = [];
          tmp[0] = el.key ?? null;
          if (el?.included || el?.edited) tmp.push(el.question, el.answer);
          return tmp;
        });
      }
      return intermediate;
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
      let newDictionary: {
        [index: string]: (string | null)[][]
      } = {};
      for (const row of table) {
        const difficult = row[2];
        if (!newDictionary[difficult]?.length) newDictionary[difficult] = [];
        newDictionary[difficult].push([null, row[0], row[1]]);
      }
      return newDictionary;
    },
  }
});