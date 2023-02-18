import { request } from "@/utils/utils";

export const test = {
  namespaced: true,
  state: {
    isTesting: false,
    timeSpent: null,
    timestamp: null,
    timeLeft: null,
    test: null,
    result: null,
    SPEECH: null,
    timer: null
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
    saveChoice(state, {choice, question}) {
      let [item] = state.test.filter(el => el.question === question);
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
    async checkTest({state, commit}) {
      let test = state.test.map(el => {
        if (el?.answer) delete el.answer;
        return el;
      });
      const result = await request(`check`, {test});
      commit("saveResult", result);
    }
  }
};