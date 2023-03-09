import { request } from "@/utils/utils";

export const test = {
  namespaced: true,
  state: {
    isTesting: false,
    timeSpent: undefined,
    timestamp: undefined,
    timeLeft: undefined,
    test: undefined,
    result: undefined,
    SPEECH: undefined,
    timer: undefined
  },
  mutations: {
    saveTimes(state) {
      state.timeSpent = state.timer - state.timeLeft;
      let date = new Date();
      state.timestamp = date.setSeconds(0, 0);
    },
    changeTestStatus(state, isTesting) {
      state.isTesting = isTesting;
    },
    saveChoice(state, {choice, key}) {
      let [item] = state.test.filter(el => el.key === key);
      item.choice = choice;
    },
    saveTimerSec(state, timeLeft) {
      state.timeLeft = timeLeft;
    },
    saveTest(state, {test, SPEECH, timer}) {
      Object.assign(state, {test, SPEECH, timer});
    },
    saveResult(state, result) {
      Object.assign(state, {result});
    }
  },
  actions: {
    async getTest({commit}, {sub = ""}) {
      const data = await request(`test/${sub}`, null, "GET");
      commit("saveTest", data);
    },
    async checkTest({state, commit}, {sub}) {
      let test = state.test.map(el => {
        if (el?.answer) delete el.answer;
        return el;
      });
      const result = await request(`check`, {test, sub});
      commit("saveResult", result);
    },
    async saveTest({state}, {sub}) {
      const data = {
        test: state.result,
        timeSpent: state.timeSpent,
        timeLeft: state.timeLeft,
        timestamp: state.timestamp,
        sub
      };
      await request("updateHistory", data);
    }
  }
};