<template>

  <template v-if="!datestamp">
    <v-card color="transparent" class="d-flex justify-center my-2" elevation="5">
      <v-card-title>
        <line-loading-component/>
      </v-card-title>
    </v-card>
  </template>

  <template v-else>
    <v-card
            color="transparent"
            class="d-flex justify-center my-2"
            elevation="5"
            @click="getTime"
    >
      <v-card-title>
        {{ date }} Количество тестов: {{ counter }}
      </v-card-title>
    </v-card>
  </template>

</template>

<script setup lang="ts">
import { computed } from "vue";
import { getDate } from "@/utils/getDate";
import LineLoadingComponent from "@/stories/bricks/LineLoading.vue";
import { useHistoryStore } from "@/store/history";
import { TimeList } from "@/types/history";

interface dateCardProps {
  datestamp?: number,
  counter?: number,
  sub?: string
}

const { datestamp, counter, sub } = defineProps<dateCardProps>();
const date = computed(() => datestamp && getDate(datestamp)[0]);
const timeList = computed(() => {
  if (!(sub && datestamp)) return;
  const inner = useHistoryStore().dateList[sub][datestamp];
  const output: TimeList = {};
  for (const key in inner) {
    if (key === "counter") continue;
    output[key] = inner[key];
  }
  return output;
});

async function getTime() {
  const keys = (timeList.value && Object.keys(timeList.value).length) ?? 0;
  if (keys > 0) return;
  if (sub && datestamp) await useHistoryStore().getTimeList(sub, datestamp);
}

</script>