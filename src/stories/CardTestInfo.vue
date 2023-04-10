<template>
  <v-container>

    <template v-if="result">
      <v-card
              class="pa-3 pb-5 ma-3"
              :class="{fail:isFail,congratulation:isCongratulation}"
              color="default"
              elevation="5"
              rounded="lg">
        <v-row class="justify-center">
          <span>{{ (name) ? name : "Вход не выполнен" }}</span>
        </v-row>
        <v-row class="mx-3 justify-space-between">
          <span>Время тестирование</span><span>{{ date }} {{ time }}</span>
        </v-row>
        <v-row class="mx-3 justify-space-between">
          <span>Кол-во верных ответов / вопросов:</span><span>Время тестирование</span>
        </v-row>
        <v-row class="mx-3 justify-space-between">
          <span>Времени затрачено:</span><span>{{ timeSpentString }}</span>
        </v-row>
      </v-card>
    </template>

  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { getDate } from "@/utils/getDate";
import { computed } from "vue";
import { useTestStore } from "@/store/test";
import { timeToString } from "@/utils/timeToString";

interface infoProps {
  timestamp: number;
  sub?: string;
}

const { timeSpent } = storeToRefs(useTestStore());

const timeSpentString = computed(() => {
  return timeToString(timeSpent.value);
});

const { name } = storeToRefs(useAuthStore());
const { result, correct } = storeToRefs(useTestStore());
const props = defineProps<infoProps>();

const [date, time] = getDate(props.timestamp);

const length = computed(() => {
  return (Object.values(result.value)).reduce((acc, cur) => {
    return acc + cur.length;
  }, 0);
});

const emit = defineEmits(["show"]);

const isFail = computed(() => {
  if (timeSpent.value !== 0) return false;
  emit("show", "fail");
  return timeSpent.value === 0;
});
const isCongratulation = computed(() => {
  if (!(length.value > 0 && length.value === correct.value)) return false;
  emit("show", "fire");
  return true;
});

</script>

<style>
.fail {
    background-color: #ff8c69 !important;
}

.congratulation {
    background-color: #8fbc8f !important;
}
</style>