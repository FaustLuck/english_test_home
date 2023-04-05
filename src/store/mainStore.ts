import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state() {
    return {
      orderDifficult: ["easy", "medium", "hard"],
      menuHeight: 0,
      isLoading: false,
      mode: '',
      isOpen: false,
      message: "",
      isAnimate: false
    };
  },
  actions: {
    setMenuHeight(height: number) {
      this.menuHeight = height;
    },
    setLoading(flag: boolean) {
      this.isLoading = flag;
    },
    setMode(mode: string) {
      this.mode = mode;
    },
    setOpen(flag: boolean) {
      if (this.mode === "settings") this.isOpen = flag;
    },
    setMessage(message: string) {
      this.message = message;
    },
    clearMessage() {
      this.message = "";
    },
    setAnimationStatus(status: boolean) {
      this.isAnimate = status;
    }
  }
});