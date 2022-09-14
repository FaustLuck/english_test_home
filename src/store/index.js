import { createStore } from "vuex";
import { auth } from "@/store/auth";
import { settings } from "@/store/settings";
import { statistic } from "@/store/statistic";
import { test } from "@/store/test";

export default createStore({
  state: {},
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
