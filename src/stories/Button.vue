<template>
  <v-btn rounded="lg" x-large :loading="isLoading">{{ value }}</v-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { mainStore } from "@/store/mainStore";

const props = defineProps<{
  value: string
}>();

const { isLoading } = storeToRefs(mainStore());
</script>