<template>

  <v-container class="d-flex flex-column-reverse px-0">

    <template v-if="!dateList[sub]">
      <card-date-component v-for="i of 3" :key="i"/>
    </template>

    <template v-else>
      <card-date-component
              v-for="(data,datestamp) in dateList[sub]"
              :key="datestamp"
              :counter="data.counter"
              :datestamp="parseInt(datestamp)"
              :sub="sub"
      />
    </template>

  </v-container>

</template>
<script setup lang="ts">

const CardDateComponent=defineAsyncComponent(()=>import("@/stories/cards/CardDate.vue"))

import { useHistoryStore } from "@/store/history";
import { defineAsyncComponent, onMounted } from "vue";

const { sub } = defineProps<{ sub: string }>();

const { dateList } = useHistoryStore();

onMounted(async () => {
  if (useHistoryStore().dateList[sub]) return;
  await useHistoryStore().getDateList(sub);

});

</script>