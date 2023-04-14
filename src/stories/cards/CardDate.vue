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
import { useRoute } from "vue-router";
import { useHistoryStore } from "@/store/history";

interface dateCardProps {
  datestamp?: number,
  counter?: number,
  sub?: string
}

const { datestamp, counter, sub } = defineProps<dateCardProps>();
const date = computed(() => datestamp && getDate(datestamp)[0]);
const router = useRoute();
const timeList = computed(() => {
  if (sub && datestamp) return useHistoryStore().dateList[sub][datestamp];
});

async function getTime() {
  const keys = (timeList.value && Object.keys(timeList.value).length) ?? 0;
  if (keys < 2 && datestamp) {
    const sub = router.params.sub as string;
    await useHistoryStore().getTimeList(sub, datestamp);
  }
}

</script>