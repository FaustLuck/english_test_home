<template>
  <v-card
          class="py-3 my-3"
          elevation="5"
          color="transparent"
          rounded="lg">
    <result-header :timestamp="timestamp" :correct="correct" :time-spent="timeSpent"
                   :questions="questions"></result-header>
    <result-detail :result="result"/>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import ResultHeader from "@/components/result/ResultHeader.vue";
import ResultDetail from "@/components/result/ResultDetail.vue";

const { timestamp, result, correct, timeSpent } = storeToRefs(useTestStore());
const { sub } = storeToRefs(useAuthStore());

watch(sub, async (value) => {
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