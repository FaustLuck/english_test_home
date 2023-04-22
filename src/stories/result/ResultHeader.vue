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
      <span><LineLoading/> <LineLoading/></span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Кол-во верных ответов / вопросов:</span>
      <span><LineLoading/> <LineLoading/></span>
    </v-row>
    <v-row class="mx-3 justify-space-between">
      <span>Времени затрачено:</span>
      <span><LineLoading/> <LineLoading/></span>
    </v-row>
  </template>

</template>

<script setup lang="ts">
import { getDate } from "@/utils/getDate";
import { timeToString } from "@/utils/timeToString";
import LineLoading from "@/stories/bricks/LineLoading.vue";
import { ref } from "vue";

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