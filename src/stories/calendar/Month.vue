<template>
  <v-sheet elevation="5" class="d-flex align-center flex-column h-100 pa-3" rounded="lg" color="transparent">
    <v-card-title class="pa-0 text-capitalize">{{ monthName }}</v-card-title>
    <table>
      <thead>
      <tr>
        <td class="text-center pa-1" v-for="dayName of daysName">
          <v-btn class="button--head" variant="text" icon="" density="comfortable">
            {{ dayName }}
          </v-btn>
        </td>
      </tr>
      </thead>
      <tbody>

      <template v-if="props.loading">
        <tr v-for="i of 5" :key="`${props.monthIndex}_${i}`">
          <td class="text-center" colspan="7">
            <LineLoading/>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr v-for="(week,i) of month" :key="`week_${i}`">
          <td class="text-center pa-1" v-for="day of week" :key="`week_${i}_${day}`">
            <v-btn v-if="day>0" variant="text" icon="" density="comfortable" :disabled="getTests(day).length===0">
              {{ day }}
            </v-btn>
          </td>
        </tr>
      </template>

      </tbody>
    </table>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LineLoading from "@/stories/bricks/LineLoading.vue";
import { useHistoryStore } from "@/store/history";

const start = ref(0);

interface CardMonthProps {
  monthIndex: number;
  year: number;
  loading: boolean;
  sub: string;
}

const monthName = computed(() => new Date(props.year, props.monthIndex).toLocaleString("ru-RU", { month: "long" }));

const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const props = defineProps<CardMonthProps>();

const month = computed(createTable);

function createTable() {
  const maxDays = new Date(props.year, props.monthIndex + 1, 0).getDate();
  const output: number[][] = [];
  output[0] = [];
  let week = 0;
  for (let day = 1; day <= maxDays; day++) {
    const index = getDayIndex(day);
    if (day === 1) fillEmptyDays(output[0], index);
    if (index === 0) output[week] = [];
    output[week][index] = day;
    if (index === 6) ++week;
  }
  return output;
}

function fillEmptyDays(week: number[], index: number) {
  for (let i = 0; i < index; i++) {
    week[i] = -i - 1;
  }
}

function getTests(day: number) {
  const start = getStartDayTimestamp(day);
  return useHistoryStore().getTestsOfDay(props.sub, props.year, start);
}

function getStartDayTimestamp(day: number) {
  return new Date(props.year, props.monthIndex, day).getTime();
}

function getDayIndex(day: number) {
  let weekDay = new Date(props.year, props.monthIndex, day).getDay();
  return (weekDay > 0) ? weekDay - 1 : 6;
}

</script>

<style lang="scss" scoped>
.button--head {
  pointer-events: none;
}

table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
}
</style>