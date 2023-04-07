<template>
  <v-layout v-if="isLoading" class="h-screen w-100 d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
  </v-layout>

</template>
<script setup lang="ts">
import { mainStore } from "@/store/mainStore";
import { storeToRefs } from "pinia";

const { isLoading } = storeToRefs(mainStore());

</script>