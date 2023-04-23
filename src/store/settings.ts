import { defineStore } from "pinia";
import { requestGet, requestPost, sendFile } from "@/utils/requests.js";
import { Dictionary, Limits, Record } from "@/types";
import { reactive, ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const dictionary: Dictionary = reactive({});
  const limits: Limits = reactive({});
  const timer = ref(0);
  const variants = ref(0);
  const isSaved = ref(true);
  const editingIndex = ref(-1);
  const editingDifficult = ref("");
  let editingItem: Record | any = reactive({});

  function startEdit(index: number, difficult: string) {
    if (dictionary[difficult][index].excluded) return;
    editingIndex.value = index;
    editingDifficult.value = difficult;
    Object.assign(editingItem, { ...dictionary[difficult][index] });
  }

  function clearEdit() {
    editingIndex.value = -1;
    editingDifficult.value = "";
    editingItem = reactive({});
  }

  function cancelEdit(index: number, difficult: string) {
    const { oldAnswer, oldQuestion } = dictionary[difficult][index];
    if (oldAnswer === undefined || oldQuestion === undefined) return;
    dictionary[difficult][index].answer = oldAnswer;
    dictionary[difficult][index].question = oldQuestion;
    delete dictionary[difficult][index].oldAnswer;
    delete dictionary[difficult][index].oldQuestion;
    delete dictionary[difficult][index].edited;
  }

  function removeIncluded(index: number, difficult: string) {
    dictionary[difficult].splice(index, 1);
  }

  function returnDeletedItem(index: number, difficult: string) {
    let item = dictionary[difficult][index];
    delete item.excluded;
  }

  function editItem() {
    const newItem = editingItem;
    let item = dictionary[editingDifficult.value][editingIndex.value];
    if (newItem?.oldAnswer === newItem.answer && newItem.oldQuestion === newItem.question) {
      delete newItem.edited;
      delete newItem.oldQuestion;
      delete newItem.oldAnswer;
      dictionary[editingDifficult.value][editingIndex.value] = newItem;
    } else {
      item.edited = true;
      if (!item?.oldAnswer) item.oldAnswer = item.answer;
      if (!item?.oldQuestion) item.oldQuestion = item.question;
      Object.assign(item, newItem);
    }
  }

  function changeSaved(flag: boolean) {
    isSaved.value = flag;
    window.onbeforeunload = (flag) ? null : () => false;
  }

  async function getSettings(sub: string) {
    const data = await requestGet(`/settings/get/${sub}`);
    Object.assign(dictionary, data.dictionary);
    Object.assign(limits, data.limits);
    timer.value = data.timer;
    variants.value = data.variants;
  }

  async function addItem(difficult: string, item: Record) {
    const isNew = checkItem(difficult, item);
    if (!isNew) return;
    changeSaved(false);
    item.included = true;
    dictionary[difficult].push(item);
    dictionary[difficult].sort((prev, next) => prev.question < next.question ? -1 : 1);
  }

  function checkItem(difficult: string, item: Record) {
    const index = dictionary[difficult]
      .findIndex(el => el.question === item.question || el.answer === item.answer);
    return index === -1;
  }

  function deleteItem(index: number, difficult: string) {
    changeSaved(false);
    let item = dictionary[difficult][index];
    if (item?.included) {
      dictionary[difficult].splice(index, 1);
    } else item.excluded = true;
  }

  function saveTimer(newTimer: number) {
    changeSaved(false);
    timer.value = newTimer;
  }

  function saveVariants(newVariants: number) {
    changeSaved(false);
    variants.value = newVariants;
  }

  function saveLimits(difficult: string, limit: number) {
    changeSaved(false);
    limits[difficult] = limit;
  }

  function finishEdit() {
    if (isChanged()) {
      changeSaved(false);
      editItem();
    }
    clearEdit();
  }

  function isChanged() {
    const newItem = editingItem;
    const oldItem = dictionary[editingDifficult.value][editingIndex.value];
    return newItem.question !== oldItem.question || newItem.answer !== oldItem.answer;
  }

  async function saveChanges(sub: string) {
    const editedDictionary = assembleChanges();
    await requestPost("/settings/save", {
      sub,
      editedDictionary,
      limits: limits.value,
      timer: timer.value,
      variants: variants.value
    });
    await getSettings(sub);
    changeSaved(true);
  }

  function assembleChanges() {
    let intermediate: Dictionary = {};
    let output: {
      [index: string]: (string | null)[][]
    } = {};
    for (let difficult in dictionary.value) {
      let filter = dictionary[difficult]
        .filter(el => el.included || el.edited || el.excluded);
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
  }

  async function sendNewDictionary(file: any, flag: string, sub: string) {
    changeSaved(false);
    await sendFile(file, flag, sub);
    await getSettings(sub);
    changeSaved(true);
  }

  async function sendNewDictionaryFromClipboard(table: string[][], isOverwrite: boolean, sub: string) {
    changeSaved(false);
    const editedDictionary = prepareTable(table);
    await requestPost("/settings/save", {
      sub,
      editedDictionary,
      limits: limits.value,
      timer: timer.value,
      variants: variants.value
    });
    await getSettings(sub);
    changeSaved(true);
  }

  function prepareTable(table: string[][]) {
    let newDictionary: {
      [index: string]: (string | null)[][]
    } = {};
    for (const row of table) {
      const difficult = row[2];
      if (!newDictionary[difficult]?.length) newDictionary[difficult] = [];
      newDictionary[difficult].push([null, row[0], row[1]]);
    }
    return newDictionary;
  }

  return {
    dictionary,
    limits,
    timer,
    variants,
    isSaved,
    editingIndex,
    editingDifficult,
    editingItem,
    startEdit,
    clearEdit,
    cancelEdit,
    removeIncluded,
    returnDeletedItem,
    // editItem,
    // changeSaved,
    getSettings,
    addItem,
    // checkItem,
    deleteItem,
    saveTimer,
    saveVariants,
    saveLimits,
    finishEdit,
    //isChanged,
    saveChanges,
    //assembleChanges,
    sendNewDictionary,
    sendNewDictionaryFromClipboard,
    //prepareTable
  };
});