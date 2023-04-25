<template>
  <v-app-bar elevation="5" color="default">

    <template v-if="!useAuthStore().isLogin">
      <v-app-bar-nav-icon class="ma-0" icon id="google"/>
    </template>

    <template v-else>
      <v-app-bar-nav-icon class="ma-0" :icon="mdiMenu" @click="$emit('toggleNavigation')"/>
    </template>

    <v-container class="d-flex justify-space-around align-center px-0">
      <v-btn
              rounded="lg"
              elevation="5"
              size="large"
              :loading="useLoadingStore().isLoading"
              @click="(useTestStore().isTesting)?useTestStore().isTesting=false:startTest()"
              class=""
      >{{ labelButton }}
      </v-btn>
      <timer v-if="useTestStore().isTesting"/>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useLoadingStore } from "@/store/loading";
import { useTestStore } from "@/store/test";
import { useCommonStore } from "@/store/common";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { mdiMenu } from "@mdi/js";
import Timer from "@/components/Timer.vue";

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
  await useAuthStore().loadScript();
});
</script>