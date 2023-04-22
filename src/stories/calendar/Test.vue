<template>
  <v-card
          @click="changeMode"
          color="transparent"
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
  <v-expand-transition v-if="mode>0">
    <result-detail :result="localTest"/>
  </v-expand-transition>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, Ref, ref, watchEffect } from "vue";
import { useHistoryStore } from "@/store/history";
import { HistoryRecord, TestDetail } from "@/types/history";
import { storeToRefs } from "pinia";

const ResultDetail = defineAsyncComponent(() => import("@/stories/result/ResultDetail.vue"));
const ResultHeader = defineAsyncComponent(() => import("@/stories/result/ResultHeader.vue"));

const props = defineProps<{ sub: string, timestamp: string, result: HistoryRecord }>();

const year = computed(() => new Date(+props.timestamp).getFullYear());
const { history } = storeToRefs(useHistoryStore());

const result = history.value[props.sub][year.value].find(el => el.key === props.result.key) as HistoryRecord;

const mode: Ref<number> = ref(0);

let localTest: Ref<TestDetail | undefined> = ref(undefined);

watchEffect(() => {
  if (!result.test && mode.value > 0) {
    localTest.value = undefined;
    return;
  }
  if (mode.value === 2) {
    localTest.value = result.test;
    return;
  }
  localTest.value = {};
  for (const difficult in result.test) {
    localTest.value[difficult] = result.test[difficult].filter(el => el.answer !== el.choice);
  }

});

async function changeMode() {
  mode.value++;
  const { correct, questions } = result.info!;
  if (mode.value > 2) mode.value = 0;
  if ((correct === questions || correct === 0) && mode.value === 1) mode.value = 2;
  if (mode.value === 0 || result.test) return;
  await useHistoryStore().getResult(props.sub, result.key, year.value);
}
</script>