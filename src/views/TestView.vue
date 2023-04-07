<template>
  <v-container class="pa-0">
    <template v-if="isLoading">
      <card-component v-for="i of 3" :key="i"/>
    </template>
    <template v-else>
      <card-component v-for="(item) of test" :key="item.key" :item="item"/>
    </template>
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

const router = useRouter();

watch(isTesting, async (value) => {
  if (value) return;
  await useTestStore().sendAnswers(sub.value);
  await router.push({ name: "result" });
});

</script>