<template>
  <v-card
          v-for="result of range" :key="result.key"
          class="ma-3"
          elevation="5"
          color="transparent"
          rounded="lg">
    <test  :sub="sub" :timestamp="timestamp" :result="result"></test>
  </v-card>
</template>


<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useHistoryStore } from "@/store/history";

const Test = defineAsyncComponent(() => import("@/stories/calendar/Test.vue"));

const props = defineProps<{ sub: string, timestamp: string }>();

const year = computed(() => new Date(+props.timestamp).getFullYear());

const range = computed(getRange);

function getRange() {
  const end = new Date(+props.timestamp + 24 * 60 * 60 * 1000).getTime();
  return useHistoryStore().getRange(props.sub, year.value, +props.timestamp, end);
}

onMounted(async () => {
  if (getRange().some(el => !el.info)) await useHistoryStore().getHistoryOfDay(+props.timestamp, props.sub, year.value);
});
</script>
