<template>
  <v-app-bar elevation="5" color="default">

    <template v-if="!useAuthStore().isLogin">
      <v-app-bar-nav-icon class="ml-2" id="google"/>
    </template>

    <template v-else>
      <v-app-bar-nav-icon class="ml-2" @click="$emit('toggleNavigation')"/>
    </template>

    <v-container class="d-flex justify-space-around align-center">
      <v-btn
              rounded="lg"
              elevation="5"
              size="large"
              :loading="useLoadingStore().isLoading"
              @click="(useTestStore().isTesting)?useTestStore().isTesting=false:startTest()"
      >{{ labelButton }}
      </v-btn>
      <timer-component v-if="useTestStore().isTesting"></timer-component>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted } from "vue";
import { useLoadingStore } from "@/store/loading";
import { useTestStore } from "@/store/test";
import { useCommonStore } from "@/store/common";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const TimerComponent = defineAsyncComponent(() => import("@/stories/Timer.vue"));

const router = useRouter();

const labelButton = computed(() => (useTestStore().isTesting) ? "Завершить тест" : "Начать тест");

async function startTest() {
  useLoadingStore().isLoading = true;
  if (useCommonStore().mode === "result") {
    await router.replace({ name: "test" });
  } else if (useCommonStore().mode !== "test") {
    await router.push({ name: "test" });
  }
  const { sub } = useAuthStore();

  await useTestStore().getTest(sub);
  useTestStore().isTesting = true;
  useLoadingStore().isLoading = false;
}

onMounted(async () => {
  if (useAuthStore().isLogin) return;
  await useAuthStore().googleInitialize();
});
</script>

