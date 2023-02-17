// import { firebaseRealtime } from "@/main";
// import { ref, set } from "firebase/database";

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
    saveTimes(state, timeSpent) {
      state.timeSpent = timeSpent;
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
    saveTimerSec(state, secondsLeft) {
      state.timeLeft = secondsLeft;
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
      let res = await fetch("http://localhost:8080/test", { //TODO после заменить
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({sub})
      });
      if (res.ok) {
        commit("saveTest", await res.json());
      }
    },
    async checkTest({state, commit}) {
      let test = state.test.map(el => {
        if (el?.answer) delete el.answer;
        return el;
      });
      let res = await fetch("http://localhost:8080/check", { //TODO после заменить
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({test})
      });
      if (res.ok) {
        commit("saveResult", await res.json());
      }
    }
  }
};