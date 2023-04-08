<template>
  <v-layout v-if="isLoading" class="h-screen w-100 d-flex align-center justify-center">
    <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
  </v-layout>

</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";

const { isLoading } = storeToRefs(useCommonStore());

</script>