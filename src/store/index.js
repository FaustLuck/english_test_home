import { createStore } from "vuex";
import { auth } from "@/store/auth";
import { settings } from "@/store/settings";
import { statistic } from "@/store/statistic";
import { test } from "@/store/test";

export default createStore({
  state: {
    orderDifficult: ["easy", "medium", "hard"]
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    settings,
    statistic,
    test
  }
})
