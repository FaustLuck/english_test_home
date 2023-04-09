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

watch(timeLeft, async (value) => {
  if (value < 30 && timerID.value > 0) {
    document.body.classList.add("warning");
  }
  if (value < 11 && timerID.value > 0) {
    document.body.classList.remove("warning");
    document.body.classList.add("flash");
  }
  if (value === 0 && timerID.value > 0) {
    document.body.classList.remove("flash");
    testStore.clearTimerID();
    document.body.classList.add("fail");
    setTimeout(async () => {
      document.body.classList.remove("fail");
      await router.push("result");
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