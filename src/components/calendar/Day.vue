<template>
  <v-card
          v-for="result of range" :key="result.key"
          class="mx-sm-3 mx-0 my-3"
          elevation="5"
          color="transparent"
          rounded="lg">
    <test :sub="sub" :result="result"></test>
  </v-card>
</template>


<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useHistoryStore } from "@/store/history";
import Test from "@/components/calendar/Test.vue";


const props = defineProps<{ sub: string, timestamp: string }>();

const year = computed(() => new Date(+props.timestamp).getFullYear());

const range = computed(getRange);

function getRange() {
  const end = new Date(+props.timestamp + 24 * 60 * 60 * 1000).getTime();
  return useHistoryStore().getRange(props.sub, year.value, +props.timestamp, end);
}

onMounted(async () => {
  if (getRange().some(el => !el.info)) {
    const end = +props.timestamp + 1000 * 60 * 60 * 24;
    await useHistoryStore().getHistoryRange(year.value, props.sub, +props.timestamp, end);
  }
});
</script>
