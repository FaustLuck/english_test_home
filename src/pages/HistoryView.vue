<template>
  <v-container class="d-flex flex-column px-0 w-100">
    <calendar-header
            :year="year"
            @increment="year++"
            @decrement="year--"
    />

    <v-sheet color="transparent" class="calendar">
      <card-month-component v-for="(month, index) of months" :year="year" :month-name="month" :is-loaded="isLoaded"
                            :month-index="index"/>
    </v-sheet>

  </v-container>

</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import { useHistoryStore } from "@/store/history";

const CardMonthComponent = defineAsyncComponent(() => import("@/stories/calendar/Month.vue"));
const CalendarHeader = defineAsyncComponent(() => import("@/stories/calendar/CalendarHeader.vue"));

const { sub } = defineProps<{ sub: string }>();

const year = ref(0);

const isLoaded = computed(() => {
  return Boolean(useHistoryStore().history[sub]?.[year.value]);
});

onMounted(async () => {
  year.value = new Date().getFullYear();
  if (isLoaded) return;
  // await useHistoryStore().getStatistic(year.value, sub);

});

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