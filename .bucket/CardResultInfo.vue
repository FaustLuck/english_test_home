<template>
  <v-container>
    <v-card
            class="pa-3 pb-5 ma-3"
            elevation="5"
            color="transparent"
            rounded="lg">
      <result-header :timestamp="timestamp" :correct="correct" :timeSpent="timeSpent" :length="length"></result-header>
      <v-expand-transition>
        <result-detail :result="result"/>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { getDate } from "../src/utils/getDate";
import { computed, defineAsyncComponent, watchEffect } from "vue";
import { useTestStore } from "../src/store/test";
import { Result } from "../src/types/test";
import ResultDetail from "../src/stories/result/ResultDetail.vue";

const CardResultItem = defineAsyncComponent(() => import("../src/stories/cards/CardResultItem.vue"));
const ResultHeader = defineAsyncComponent(() => import("../src/stories/result/ResultHeader.vue"));

interface CardResultInfoProps {
  timestamp: number;
  result?: Result;
  correct: number;
}

const { timeSpent, timeLeft } = storeToRefs(useTestStore());

const { result, correct, timestamp } = defineProps<CardResultInfoProps>();

const [date, time] = getDate(timestamp);

const length = computed(() => {
  if (!result) return 0;
  return (Object.values(result)).flat(1).length;
});

const emit = defineEmits(["show"]);

watchEffect(() => {
  if (timeLeft.value === 0) emit("show", "fail");
  if (length.value > 0 && length.value === correct) emit("show", "fire");
});

</script>