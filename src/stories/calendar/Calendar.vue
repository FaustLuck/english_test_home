<template>
  <v-sheet color="transparent" class="calendar">
    <card-month v-for="(month, index) of months" :year="year" :month-name="month" :is-loaded
                :month-index="index"/>
  </v-sheet>
</template>

<script setup lang="ts">

import CardMonth from "@/stories/calendar/Month.vue";

const { sub, year } = defineProps<{ sub: string, year: number }>();

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

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