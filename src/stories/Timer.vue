<template>
  <v-chip>{{ time }}</v-chip>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const testStore = useTestStore();
const router = useRouter();

const { timer, timeLeft, timerID } = storeToRefs(testStore);

const time = computed(() => {
  let sec = (timeLeft.value % 60).toString().padStart(2, "0");
  let min = (timeLeft.value - parseInt(sec)) / 60;
  return `${min}:${sec}`;
});

function decreaseTime() {
  testStore.saveTimerSec(timeLeft.value - 1);
}

function changeClass(addedClass: string, removedClass = "") {
  if (addedClass) document.body.classList.add(addedClass);
  if (removedClass) document.body.classList.remove(removedClass);
}

watch(timeLeft, async (value) => {
  if (value < 30 && timerID.value > 0) changeClass("warning");
  if (value < 11 && timerID.value > 0) changeClass("flash", "warning");
  if (value === 0 && timerID.value > 0) {
    changeClass("fail", "flash");
    testStore.clearTimerID();
    setTimeout(async () => {
      changeClass("", "fail");
      testStore.changeTestStatus(false);
    }, 3000);
  }
});

onMounted(() => {
  testStore.saveTimerSec(timer.value);
  const timerID = window.setInterval(decreaseTime, 1000);
  testStore.setTimerID(timerID);
});

onBeforeUnmount(() => {
  if (!timerID.value) return;
  testStore.clearTimerID();
  testStore.saveTimes();
});
</script>