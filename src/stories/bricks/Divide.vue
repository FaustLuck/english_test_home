<template>
  <v-sheet class="d-flex align-center equal" color="transparent">
    <v-divider/>
    <v-col class="d-flex justify-center">
      <line-loading class="mx-auto" v-if="loading"/>
      <slot v-else/>
    </v-col>
    <v-divider/>
  </v-sheet>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const LineLoading = defineAsyncComponent(() => import("@/stories/bricks/LineLoading.vue"));
const VSheet = defineAsyncComponent(() => import("vuetify/components"));
const VDivider = defineAsyncComponent(() => import("vuetify/components"));
const VCol = defineAsyncComponent(() => import("vuetify/components"));

const { loading } = defineProps<{ loading: boolean }>();
</script>
<style>
.equal > * {
    flex: 1 1 100%;

}
</style>

