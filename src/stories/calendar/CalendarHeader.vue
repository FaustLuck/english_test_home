<template>
  <v-card class="d-flex justify-center align-center my-3 pa-0" elevation="5" color="transparent">
    <v-btn :icon="mdiChevronLeft" elevation="5" color="transparent" @click="$emit('decrement')"
           :disabled="year<=props.min"/>
    <v-card-title>{{ year }}</v-card-title>
    <v-btn :icon="mdiChevronRight" elevation="5" color="transparent" @click="$emit('increment')"
           :disabled="year>=props.max"/>
  </v-card>
</template>

<script setup lang="ts">
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

const props = defineProps<{ year: number, min: number, max: number }>();
</script>