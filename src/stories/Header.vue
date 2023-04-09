<template>
  <v-app-bar elevation="5" color="default">

    <template v-if="!isLogin">
      <v-app-bar-nav-icon class="ml-2" id="google"/>
    </template>

    <template v-else>
      <v-app-bar-nav-icon class="ml-2" @click="$emit('toggleNavigation')"/>
    </template>

    <v-container class="d-flex justify-space-around align-center">
      <button-component
              :value="(isTesting)?'Завершить тест' : 'Начать тест'"
              :loading="isLoading"
              @click="(isTesting)?useTestStore().changeTestStatus(false):startTest()"
      ></button-component>
      <timer-component v-if="isTesting"></timer-component>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/store/loading";
import { useTestStore } from "@/store/test";
import { useCommonStore } from "@/store/common";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const ButtonComponent = defineAsyncComponent(() => import("@/stories/bricks/Button.vue"));
const TimerComponent = defineAsyncComponent(() => import("@/components/timerComponent.vue"));

const { isLoading } = storeToRefs(useLoadingStore());
const { isTesting } = storeToRefs(useTestStore());
const { mode } = storeToRefs(useCommonStore());

const router = useRouter();

const { isLogin } = storeToRefs(useAuthStore());

async function startTest() {
  useLoadingStore().setLoading(true);
  if (mode.value === "result") {
    await router.replace({ name: "test" });
  } else if (mode.value !== "test") {
    await router.push({ name: "test" });
  }
  const { sub } = storeToRefs(useAuthStore());
  await useTestStore().getTest(sub.value);
  useTestStore().changeTestStatus(true);
  useLoadingStore().setLoading(false);
}

onMounted(async () => {
  await useAuthStore().googleInitialize();
});
</script>

