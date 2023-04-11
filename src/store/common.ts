import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useCommonStore = defineStore("common", () => {
  const orderDifficult = reactive(["easy", "medium", "hard"]);
  const mode = ref("");
  const isOpen = ref(false);
  const message = ref("");
  const isAnimate = ref(false);

  function setMode(newMode: string) {
    mode.value = newMode;
  }

  function setOpen(flag: boolean) {
    if (mode.value !== "settings") return;
    isOpen.value = flag;
  }

  function setMessage(m: string) {
    message.value = m;
  }

  function clearMessage() {
    message.value = "";
  }

  function setAnimationStatus(status: boolean) {
    isAnimate.value = status;
  }

  return {
    orderDifficult,
    mode,
    isOpen,
    message,
    isAnimate,
    setMode,
    setOpen,
    setMessage,
    clearMessage,
    setAnimationStatus
  };
});