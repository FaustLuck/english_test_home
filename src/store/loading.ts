import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore('loading',()=>{
  const isLoading = ref(false)

  function setLoading(flag: boolean) {
    isLoading.value = flag;
  }

  return {
    isLoading,
    setLoading
  }
})