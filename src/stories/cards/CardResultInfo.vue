<template>
  <v-container>
    <v-card
            class="pa-3 pb-5 ma-3"
            elevation="5"
            color="transparent"
            rounded="lg">
      <v-row class="justify-center">
        <span>{{ (name) ? name : "Вход не выполнен" }}</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Время тестирование</span><span>{{ date }} {{ time }}</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Кол-во верных ответов / вопросов:</span>
        <span v-if="correct>=0 && length>0">{{ correct }} / {{ length }}</span>
        <span v-else>?? / ??</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Времени затрачено:</span><span>{{ timeSpentString }}</span>
      </v-row>

      <v-expand-transition>
        <v-container class="pa-3">

          <template v-for="difficult of orderDifficult">

            <template v-if="!result">
              <divide-component :loading="!Boolean(result)"/>
              <v-row class="d-flex align-center my-1"
                     v-for="i of 2" :key="i">
                <v-col align-self="center" class="d-flex flex-column pa-0">
                  <line-loading-component/>
                </v-col>
                <v-col align-self="center" class="d-flex flex-column pa-0">
                  <line-loading-component/>
                </v-col>
              </v-row>
            </template>

            <template v-else-if="result[difficult]?.length>0">
              <divide-component :loading="false">
                <v-card-title class="py-1"> {{ difficult }}</v-card-title>
              </divide-component>
              <card-result-item v-for="item of result[difficult]" :key="item.question" :item="item"></card-result-item>
            </template>

          </template>

        </v-container>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { getDate } from "@/utils/getDate";
import { computed, defineAsyncComponent, watchEffect } from "vue";
import { useTestStore } from "@/store/test";
import { timeToString } from "@/utils/timeToString";
import { useCommonStore } from "@/store/common";
import LineLoadingComponent from "@/stories/bricks/LineLoading.vue";
import DivideComponent from "@/stories/bricks/Divide.vue";
import { Result } from "@/types/test";

const CardResultItem = defineAsyncComponent(() => import("@/stories/cards/CardResultItem.vue"));

interface CardResultInfoProps {
  timestamp: number;
  result?: Result;
  correct: number;
}


const { timeSpent, timeLeft } = storeToRefs(useTestStore());

const timeSpentString = computed(() => {
  return timeToString(timeSpent.value);
});

const { name } = storeToRefs(useAuthStore());
const { orderDifficult } = storeToRefs(useCommonStore());
const { result, correct, timestamp } = defineProps<CardResultInfoProps>();

const [date, time] = getDate(timestamp);

const length = computed(() => {
  if (!result) return 0;
  return (Object.values(result)).flat(1).length;
});

const emit = defineEmits(["show"]);

watchEffect(() => {
  if (timeLeft.value === 0) emit("show", "fail");
  if (length.value > 0 && length.value === correct) emit("show", "fire");
});

</script>