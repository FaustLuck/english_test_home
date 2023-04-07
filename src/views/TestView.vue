<template>
  <v-container class="pa-0">
    <card-component v-for="i of 3" :key="i" :loading="isLoading"/>
    <card-component v-for="(item) of test" :key="item.key" :item="item" :loading="isLoading"/>
  </v-container>
</template>

<script setup lang="ts">
import { mainStore } from "@/store/mainStore";
import { authStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { defineAsyncComponent, watch } from "vue";
import { useRouter } from "vue-router";

const CardComponent = defineAsyncComponent(() => import("@/stories/CardTest.vue"));

const { isLoading } = storeToRefs(mainStore());
const { sub } = storeToRefs(authStore());
const { test, isTesting } = storeToRefs(useTestStore());

watch(isTesting, async (value) => {
  if (value) return;
  await useTestStore().sendAnswers(sub.value);
  await useRouter().push({ name: "result" });
});

</script>