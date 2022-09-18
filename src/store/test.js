import { toFill } from "@/utils";

export const test = {
  namespaced: true,
  state: {
    answers: null,
    isTesting: false,
    timeSpent: null,
    date: null,
    time: null,
    timeLeft: null
  },
  mutations: {
    prepareAnswers(state, {dictionary, limits}) {
      let answers = {};
      for (let difficult in dictionary) {
        answers[difficult] = toFill(dictionary[difficult], limits[difficult]);
      }
      state.answers = answers;
    },
    saveTimes(state, timeSpent) {
      state.timeSpent = timeSpent;
      let date = new Intl.DateTimeFormat("ru-Ru", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(new Date())
        .split(", ");
      date[0] = date[0].split(".").reverse().join("-");
      [state.date, state.time] = date;
    },
    changeTestStatus(state, isTesting) {
      state.isTesting = isTesting;
    },
    saveChoice(state, {choice, question, difficult}) {
      let i = state.answers[difficult].findIndex(el => el.question === question);
      state.answers[difficult][i].choice = choice;
    },
    setTimerSec(state, secondsLeft) {
      state.timeLeft = secondsLeft;
    }
  }
};