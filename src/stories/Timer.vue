<template>
  <v-chip :text="time"></v-chip>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { timeToString } from "@/utils/timeToString";

const testStore = useTestStore();

const { timeLeft } = storeToRefs(testStore);

const time = computed(() => {
  return timeToString(testStore.timeLeft);
});

function decreaseTime() {
  testStore.timeLeft--;
}

function changeClass(addedClass: string, removedClass = "") {
  if (addedClass) document.body.classList.add(addedClass);
  if (removedClass) document.body.classList.remove(removedClass);
}

watch(timeLeft, async (value) => {
  if (value < 30 && testStore.timerID > 0) changeClass("warning");
  if (value < 11 && testStore.timerID > 0) changeClass("flash", "warning");
  if (value === 0 && testStore.timerID > 0) {
    changeClass("fail", "flash");
    testStore.clearTimerID();
    setTimeout(async () => {
      changeClass("", "fail");
      testStore.isTesting = false;
    }, 3000);
  }
});

onMounted(() => {
  testStore.timeLeft = testStore.timer;
  testStore.timerID = window.setInterval(decreaseTime, 1000);
});

onBeforeUnmount(() => {
  if (!testStore.timerID) return;
  testStore.clearTimerID();
  testStore.saveTimes();
});
</script>