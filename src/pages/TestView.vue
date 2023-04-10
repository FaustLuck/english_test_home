<template>
  <v-container class="pa-0">
    <template v-if="isLoading">
      <card-test-item-component v-for="i of 3" :key="i"/>
    </template>
    <template v-else>
      <card-test-item-component v-for="(item) of test" :key="item.key" :item="item"/>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { defineAsyncComponent, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";

const CardTestItemComponent = defineAsyncComponent(() => import("@/stories/CardTestItem.vue"));

const { isLoading } = storeToRefs(useLoadingStore());
const { sub } = storeToRefs(useAuthStore());
const { test, isTesting } = storeToRefs(useTestStore());

const router = useRouter();

watch(isTesting, async (value) => {
  if (value && test.value.length!==0) return;
  await useTestStore().sendAnswers(sub.value);
  await router.push({ name: "result" });
});

</script>