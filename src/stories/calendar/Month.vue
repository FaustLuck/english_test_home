<template>
  <v-sheet elevation="5" class="d-flex align-center flex-column h-100 pa-3" rounded="lg" color="transparent">
    <v-card-title class="pa-0 text-capitalize">{{ monthName}}</v-card-title>
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

      <template v-if="isLoaded">
        <tr v-for="week of month" :key="week">
          <td class="text-center pa-1" v-for="day of week">
            <v-btn v-if="day" variant="text" icon="" density="comfortable">
              {{ day }}
            </v-btn>
          </td>
        </tr>
      </template>

      <template v-else>
        <tr v-for="i of 5" :key="i">
          <td class="text-center" colspan="7">
            <LineLoading/>
          </td>
        </tr>
      </template>

      </tbody>
    </table>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import LineLoading from "@/stories/bricks/LineLoading.vue";

interface CardMonthProps {
  monthIndex: number;
  year: number;
  isLoaded: boolean;
}

const monthName = computed(() => new Date(props.year, props.monthIndex).toLocaleString("ru-RU", { month: "long" }));

const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const props = defineProps<CardMonthProps>();

const firstDayIndex = computed(() => {
  return getDayIndex(1);
});

const maxDays = computed(() => {
  return new Date(props.year, props.monthIndex + 1, 0).getDate();
});

const maxWeeks = computed(() => {
  let weeks = 0;
  let restOfWeek = 0;
  if (firstDayIndex.value > 0) {
    ++weeks;
    restOfWeek = 7 - firstDayIndex.value;
  }
  weeks += Math.ceil((maxDays.value - restOfWeek) / 7);
  return weeks;
});

const month = computed(() => {
  let month = new Array(maxWeeks.value);
  month[0] = [];
  let week = 0;
  for (let day = 1; day <= maxDays.value; day++) {
    const index = getDayIndex(day);
    if (index === 0) month[week] = [];
    month[week][index] = day;
    if (index === 6) week++;
  }
  return month;
});

function getDayIndex(day) {
  let weekDay = new Date(year, monthIndex, day).getDay();
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