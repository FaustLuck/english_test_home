import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state() {
    return {
      orderDifficult: ["easy", "medium", "hard"],
      menuHeight: 0,
      isLoading: false,
      mode: undefined,
      isOpen: false,
      message: "",
      isAnimate: false
    };
  },
  actions: {
    setMenuHeight(height) {
      this.menuHeight = height;
    },
    setLoading(flag) {
      this.isLoading = flag;
    },
    setMode(mode) {
      this.mode = mode;
    },
    setOpen(flag) {
      if (this.mode === "settings") this.isOpen = flag;
    },
    setMessage(message) {
      this.message = message;
    },
    clearMessage() {
      this.message = "";
    },
    setAnimationStatus(status) {
      this.isAnimate = status;
    }
  }
});