<template>
  <template v-if="!props.user">
    <v-card class="d-flex align-center my-3" elevation="5" rounded="lg" color="transparent">
      <v-card-item>
        <v-avatar color="surface-variant" size="80"></v-avatar>
      </v-card-item>
      <line-loading-component/>
    </v-card>
  </template>

  <template v-else>
    <v-card class="d-flex align-center my-3"
            elevation="5"
            rounded="lg"
            color="transparent"
    >
      <v-card-item>
        <v-avatar class="fill-height" :image="props.user.picture" size="80"></v-avatar>
      </v-card-item>
      <v-card-text class="pa-6">{{ props.user.name }}</v-card-text>
    </v-card>
  </template>
</template>

<script setup lang="ts">
import { User } from "@/types";

import LineLoadingComponent from "@/stories/bricks/LineLoading.vue";

const props = defineProps<{ user?: User }>();
</script>