<template>
  <v-container class="d-flex flex-column px-0 w-100 h-100">
    <calendar-header
            :year="+year"
            :min="minYear"
            :max="maxYear"
            @increment="year++"
            @decrement="year--"
    />

    <template v-if="isEmpty">
      <v-sheet color="transparent" class="d-flex justify-center align-center h-100">
        <v-card-title>
          За {{ year }} год записей не найдено
        </v-card-title>
      </v-sheet>
    </template>

    <template v-else>
      <v-sheet color="transparent" class="calendar">
        <card-month-component v-for="i of 12" :key="`${year}_month_${i}`" :year="+year" :loading="loading"
                              :month-index="i-1" :sub="sub"/>
      </v-sheet>
    </template>

  </v-container>

</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, watchEffect } from "vue";
import { useHistoryStore } from "@/store/history";

const CardMonthComponent = defineAsyncComponent(() => import("@/stories/calendar/Month.vue"));
const CalendarHeader = defineAsyncComponent(() => import("@/stories/calendar/CalendarHeader.vue"));

const props = defineProps<{ sub: string, year: string }>();
const loading = ref(false);
const isEmpty = ref(false);

const minYear = useHistoryStore()?.getUser(props.sub)?.minYear;
const maxYear = new Date().getFullYear();

watchEffect(async () => {
  isEmpty.value = false;
  if (useHistoryStore().history[props.sub]?.[props.year]?.length === undefined) {
    loading.value = true;
    await getStatistic();
    loading.value = false;
  }
  isEmpty.value = useHistoryStore().checkRange(props.sub, +props.year).length === 0;
});

async function getStatistic() {
  await useHistoryStore().getHistoryOfYear(props.year, props.sub);
  isEmpty.value = useHistoryStore().checkRange(props.sub, +props.year).length === 0;
}
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media screen and (max-width: 1920px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>