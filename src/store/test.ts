import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { TestItem } from "@/types/test";
import { requestGet, requestPost } from "@/utils/requests";

export const useTestStore = defineStore("test", () => {
  const isTesting = ref(false);
  const timeSpent = ref(0);
  const timestamp = ref(0);
  const timeLeft = ref(0);
  let test: TestItem[] = reactive([]);
  let result = reactive([]);
  const SPEECH = ref("");
  const timer = ref(0);
  const timerID = ref(0);
  const ID = ref("");

  function saveTimes() {
    timeSpent.value = timer.value - timeLeft.value;
    timestamp.value = new Date().setSeconds(0, 0);
  }

  function changeTestStatus(flag: boolean) {
    isTesting.value = flag;
    if (!flag) clearTest();
  }

  function saveChoice(choice: string, key?: string) {
    if (!key) return;
    const item = test.find(el => el.key === key);
    if (item) item.choice = choice;
  }

  function clearTest() {
    test.length = 0;
  }

  function setTimerID(id: number) {
    timerID.value = id;
  }

  function clearTimerID() {
    window.clearInterval(timerID.value);
    timerID.value = 0;
  }

  function resetTimes() {
    timeSpent.value = 0;
    timestamp.value = 0;
  }

  function resetTest() {
    clearTest();
    clearTimerID();
    changeTestStatus(false);
    saveTimerSec(0);
    resetTimes();
  }

  function saveTimerSec(time: number) {
    timeLeft.value = time;
  }

  async function getTest(sub = "") {
    const data = await requestGet(`/test/${sub}`);
    Object.assign(test, data.test);
    SPEECH.value = data.SPEECH;
    timer.value = data.timer;
  }

  async function sendAnswers(sub: string | undefined) {
    let tmp = test.map(el => {
      const newEl = { ...el };
      if (newEl?.answer) delete newEl.answer;
      return newEl;
    });
    generateID();
    await requestPost(`/test/check`, { test: tmp, sub, id: ID.value });
  }

  async function getVerifiedTest() {
    const data = await requestGet(`/test/result/${ID.value}`);
    Object.assign(result, data.result);
  }

  async function saveTest(sub: string) {
    const data = createBody(sub);
    await requestPost("/history/update", data);
  }

  function generateID() {
    ID.value = Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  function createBody(sub: string) {
    return {
      timeSpent: timeSpent.value,
      timeLeft: timeLeft.value,
      sub,
      timestamp: timestamp.value,
      ...(result && { test: result }),
    };
  }

  return {
    isTesting,
    timeSpent,
    timestamp,
    timeLeft,
    test,
    result,
    SPEECH,
    timer,
    timerID,
    ID,
    saveTimes,
    changeTestStatus,
    saveChoice,
    setTimerID,
    clearTimerID,
    resetTest,
    saveTimerSec,
    getTest,
    sendAnswers,
    getVerifiedTest,
    saveTest
  };
});