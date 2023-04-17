<template>
  <v-card class="d-flex justify-center align-center mb-3" elevation="5" color="transparent">
    <v-btn icon="mdi mdi-chevron-left" elevation="5" color="transparent" @click="$emit('decrement')"/>
    <v-card-title>{{ year }}</v-card-title>
    <v-btn icon="mdi mdi-chevron-right" elevation="5" color="transparent" @click="$emit('increment')"/>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ year: number }>();
</script>