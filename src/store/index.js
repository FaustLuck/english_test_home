import { createStore } from "vuex";
import { auth } from "@/store/auth";
import { settings } from "@/store/settings";
import { statistic } from "@/store/statistic";
import { test } from "@/store/test";

export default createStore({
  state: {
    orderDifficult: ["easy", "medium", "hard"],
    menuHeight: 0,
    isLoading: false,
    mode: null,
    isOpen: false
  },
  getters: {},
  mutations: {
    setMenuHeight(state, h) {
      state.menuHeight = h;
    },
    setLoading(state, flag) {
      state.isLoading = flag;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setOpen(state, flag) {
      if (state.mode === "settings") state.isOpen = flag;
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
