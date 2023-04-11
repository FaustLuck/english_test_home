<template>
  <v-container>
    <v-card
            class="pa-3 pb-5 ma-3"
            elevation="5"
            rounded="lg">
      <v-row class="justify-center">
        <span>{{ (name) ? name : "Вход не выполнен" }}</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Время тестирование</span><span>{{ date }} {{ time }}</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Кол-во верных ответов / вопросов:</span>
        <span>{{ (correct) ? correct : "?" }}
          /
          {{ (length) ? length : "?" }}</span>
      </v-row>
      <v-row class="mx-3 justify-space-between">
        <span>Времени затрачено:</span><span>{{ timeSpentString }}</span>
      </v-row>

      <v-expand-transition>
        <v-container class="pa-3">
          <v-divider class="mt-5" thickness="5"></v-divider>

          <template v-for="difficult of orderDifficult">
            <line-loading-component class="d-flex justify-center pa-0" v-if="Object.keys(result).length===0"/>
            <v-card-title v-else class="d-flex justify-center pa-0"> {{ difficult }}</v-card-title>
            <v-divider class="mb-2 mx-auto" inset></v-divider>

            <template v-if="Object.keys(result).length===0">
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

            <template v-else>
              <card-result-item v-for="item of result[difficult]" :key="item.key" :item="item"></card-result-item>
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
import { computed, defineAsyncComponent } from "vue";
import { useTestStore } from "@/store/test";
import { timeToString } from "@/utils/timeToString";
import { useCommonStore } from "@/store/common";
import LineLoadingComponent from "@/stories/bricks/LineLoading.vue";

const CardResultItem = defineAsyncComponent(() => import("@/stories/CardResultItem.vue"));

const { timeSpent, timeLeft } = storeToRefs(useTestStore());

const timeSpentString = computed(() => {
  return timeToString(timeSpent.value);
});

const { name } = storeToRefs(useAuthStore());
const { result, correct } = storeToRefs(useTestStore());
const { orderDifficult } = storeToRefs(useCommonStore());
const props = defineProps<{ timestamp: number }>();

const [date, time] = getDate(props.timestamp);

const length = computed(() => {
  return (Object.values(result.value)).reduce((acc, cur) => {
    return acc + cur.length;
  }, 0);
});

const emit = defineEmits(["show"]);

const isFail = computed(() => {
  if (timeLeft.value !== 0) return false;
  emit("show", "fail");
  return timeLeft.value === 0;
});
const isCongratulation = computed(() => {
  if (!(length.value > 0 && length.value === correct.value)) return false;
  emit("show", "fire");
  return true;
});

</script>