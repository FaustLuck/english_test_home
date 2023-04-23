<template>
  <v-card
          @click="changeMode"
          :color="color"
          elevation="0"
          class="pa-3"
  >
    <result-header
            :timestamp="result.timestamp"
            :correct="result.info?.correct"
            :time-spent="result.info?.timeSpent"
            :questions="result.info?.questions"
    />
  </v-card>
  <template v-if="mode>0">
    <result-detail :result="localTest"/>
  </template>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, Ref, ref, watchEffect } from "vue";
import { useHistoryStore } from "@/store/history";
import { HistoryRecord, TestDetail } from "@/types";

const ResultDetail = defineAsyncComponent(() => import("@/stories/result/ResultDetail.vue"));
const ResultHeader = defineAsyncComponent(() => import("@/stories/result/ResultHeader.vue"));

const props = defineProps<{ sub: string, result: HistoryRecord }>();
const mode: Ref<number> = ref(0);

const color = computed(() => {
  if (mode.value === 0) {
    if (props.result.info?.timeLeft === 0) return "#ff8c69";
    if (props.result.info?.correct && props.result.info?.correct === props.result.info?.questions) return "#8fbc8f";
  }
  return "transparent";
});

let localTest: Ref<TestDetail | undefined> = ref(undefined);

watchEffect(() => {
  if (!props.result.test) {
    localTest.value = undefined;
    return;
  }
  switch (mode.value) {
    case 1:
      localTest.value = {};
      for (const difficult in props.result.test) {
        localTest.value[difficult] = props.result.test[difficult].filter(el => el.answer !== el.choice);
      }
      break;
    case 2:
      localTest.value = props.result.test;
      return;
  }
});

async function changeMode() {
  mode.value++;
  const { correct, questions } = props.result.info!;
  if (mode.value > 2) mode.value = 0;
  if ((correct === questions || correct === 0) && mode.value === 1) mode.value = 2;
  if (mode.value === 0 || props.result.test) return;
  const year = new Date(+props.result.timestamp).getFullYear();
  await useHistoryStore().getResult(props.sub, props.result.key, year);
}
</script>