<template>

  <template v-if="correct!==undefined">
    <v-row class="mx-3 justify-space-between">
      <span>Время тестирование</span><span>{{ date }} {{ time }}</span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Кол-во верных ответов / вопросов:</span>
      <span>{{ correct }} / {{ questions }}</span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Времени затрачено:</span><span>{{ timeToString(timeSpent) }}</span>
    </v-row>
  </template>

  <template v-else>
    <v-row class="mx-3 justify-space-between">
      <span>Время тестирование</span>
      <span><line-loading/> <line-loading/></span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Кол-во верных ответов / вопросов:</span>
      <span><line-loading/> <line-loading/></span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Времени затрачено:</span>
      <span><line-loading/> <line-loading/></span>
    </v-row>
  </template>

</template>

<script setup lang="ts">
import { getDate } from "@/utils/getDate";
import { timeToString } from "@/utils/timeToString";
import { ref } from "vue";
import LineLoading from "@/components/bricks/LineLoading.vue";


interface ResultHeaderProps {
  timestamp?: number,
  correct?: number,
  timeSpent?: number,
  questions?: number
}

let date = ref("");
let time = ref("");
const props = defineProps<ResultHeaderProps>();

if (props.timestamp) {
  ([date.value, time.value] = getDate(props.timestamp));
}
</script>