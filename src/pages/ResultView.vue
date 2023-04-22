<template>
  <v-card
          class="pa-3 pb-5 ma-3"
          elevation="5"
          color="transparent"
          rounded="lg">
    <result-header :timestamp="timestamp" :correct="correct" :time-spent="timeSpent"
                   :questions="questions"></result-header>
    <result-detail :result="result"/>
  </v-card>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";

const ResultDetail = defineAsyncComponent(() => import("@/stories/result/ResultDetail.vue"));
const ResultHeader = defineAsyncComponent(() => import("@/stories/result/ResultHeader.vue"));

const { timestamp, result, correct, timeSpent } = storeToRefs(useTestStore());
const { sub } = storeToRefs(useAuthStore());

watch([sub], async (value) => {
  if (value) await useTestStore().saveTest(sub.value);
});

onMounted(async () => {
  await useTestStore().getVerifiedTest();
  if (sub.value) await useTestStore().saveTest(sub.value);
});

const questions = computed(() => {
  if (!result) return 0;
  return (Object.values(result.value)).flat(1).length;
});


const router = useRouter();

function show(nameShow: string) {
  setTimeout(() => {
    router.replace({ name: "show", params: { nameShow } });
  }, 3000);
}

watchEffect(() => {
  if (useTestStore().timeLeft === 0) show("fail");
  if (questions.value > 0 && questions.value === correct.value) show("fire");
});
</script>