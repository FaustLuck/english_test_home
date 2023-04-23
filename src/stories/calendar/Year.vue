<template>
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
      <month v-for="i of 12" :key="`${year}_month_${i}`" :year="+year" :loading="loading"
                            :month-index="i-1" :sub="sub"/>
    </v-sheet>
  </template>

</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useHistoryStore } from "@/store/history";
import CalendarHeader from "@/stories/calendar/CalendarHeader.vue";
import Month from "@/stories/calendar/Month.vue"

const props = defineProps<{ sub: string, year: string }>();
const loading = ref(false);
const isEmpty = ref(false);

const minYear = useHistoryStore().getUser(props.sub)?.minYear as number;
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