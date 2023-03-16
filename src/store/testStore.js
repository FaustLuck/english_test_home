import { defineStore } from "pinia";
import { requestGet, requestPost } from "@/utils/requests";

export const testStore = defineStore("test", {
  state() {
    return {
      isTesting: false,
      timeSpent: undefined,
      timestamp: undefined,
      timeLeft: undefined,
      test: undefined,
      result: undefined,
      SPEECH: undefined,
      timer: undefined,
      ID: undefined
    };
  },
  actions: {
    saveTimes() {
      this.timeSpent = this.timer - this.timeLeft;
      this.timestamp = new Date().setSeconds(0, 0);
    },
    changeTestStatus(isTesting) {
      this.isTesting = isTesting;
    },
    saveChoice(choice, key) {
      let [item] = this.test.filter(el => el.key === key);
      item.choice = choice;
    },
    saveTimerSec(timeLeft) {
      this.timeLeft = timeLeft;
    },
    async getTest(sub = "") {
      const data = await requestGet(`/test/${sub}`);
      Object.assign(this, data);
    },
    async sendAnswers(sub) {
      let test = this.test.map(el => {
        if (el?.answer) delete el.answer;
        return el;
      });
      if (!sub) this.generateID();
      await requestPost(`/test/check`, {test, sub, id: this.ID});
    },
    async getVerifiedTest() {
      this.result =await requestGet(`/test/result/${this.ID}`);
    },
    async saveTest(sub) {
      const data = this.createBody(sub);
      await requestPost("/history/update", data);
    },
    generateID() {
      this.ID = Date.now().toString(36) + Math.random().toString(36).substring(2);
    },
    createBody(sub) {
      return {
        timeSpent: this.timeSpent,
        timeLeft: this.timeLeft,
        timestamp: this.timestamp,
        ...(this.result && {test: this.result}),
        ...(sub)
      };
    }
  }
});