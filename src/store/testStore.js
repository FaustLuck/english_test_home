import { request } from "@/utils/utils";
import { defineStore } from "pinia";

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
      timer: undefined
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
    saveChoice({choice, key}) {
      let [item] = this.test.filter(el => el.key === key);
      item.choice = choice;
    },
    saveTimerSec(timeLeft) {
      this.timeLeft = timeLeft;
    },
    async getTest({sub = ""}) {
      const data = await request(`/test/${sub}`, null, "GET");
      Object.assign(this, data);
    },
    async checkTest({sub}) {
      let test = this.test.map(el => {
        if (el?.answer) delete el.answer;
        return el;
      });
      this.result = await request(`/test/check`, {test, sub});
    },
    async saveTest({sub}) {
      const data = {
        test: this.result,
        timeSpent: this.timeSpent,
        timeLeft: this.timeLeft,
        timestamp: this.timestamp,
        sub
      };
      await request("/history/update", data);
    }
  }
});