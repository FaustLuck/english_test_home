import { createStore } from "vuex";
import { auth } from "@/store/auth";
import { settings } from "@/store/settings";
import { statistic } from "@/store/statistic";
import { test } from "@/store/test";

export default createStore({
  state: {
    orderDifficult: ["easy", "medium", "hard"],
    menuHeight: 0
  },
  getters: {},
  mutations: {
    setMenuHeight(state, h) {
      state.menuHeight = h;
    }
  },
  actions: {},
  modules: {
    auth,
    settings,
    statistic,
    test
  }
})
