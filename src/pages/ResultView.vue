<template>
  <card-result-info-component
          :timestamp="timestamp"
          :result="result"
          :correct="correct"
          @show="show"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";

const CardResultInfoComponent = defineAsyncComponent(() => import("@/stories/cards/CardResultInfo.vue"));
const router = useRouter();

const { timestamp, result, correct } = storeToRefs(useTestStore());
const { sub } = storeToRefs(useAuthStore());

watch([sub.value], async (value) => {
  if (value) await useTestStore().saveTest(sub.value);
});

onMounted(async () => {
  await useTestStore().getVerifiedTest();
  useLoadingStore().setLoading(false);
  if (sub.value) await useTestStore().saveTest(sub.value);
});

function show(nameShow: string) {
  setTimeout(() => {
    router.replace({ name: `${nameShow}-show` });
  }, 3000);
}

</script>