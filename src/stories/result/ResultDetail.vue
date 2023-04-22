<template>
  <v-container class="pa-3">

    <template v-for="difficult of orderDifficult">

      <template v-if="!result">
        <divide-component :loading="true"/>
        <v-row class="d-flex align-center my-1"
               v-for="i of 2" :key="i">
          <v-col align-self="center" class="d-flex flex-column pa-0">
            <line-loading-component/>
          </v-col>
          <v-col align-self="center" class="d-flex flex-column pa-0">
            <line-loading-component/>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="result[difficult]?.length>0">
        <divide-component :loading="false">
          <v-card-title class="py-1"> {{ difficult }}</v-card-title>
        </divide-component>
        <card-result-item v-for="item of result[difficult]" :key="item.question" :item="item"></card-result-item>
      </template>

    </template>
  </v-container>

</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";
import { TestDetail } from "@/types/history";

const VContainer = defineAsyncComponent(() => import("vuetify/components"));
const VRow = defineAsyncComponent(() => import("vuetify/components"));
const VCol = defineAsyncComponent(() => import("vuetify/components"));
const VCardTitle = defineAsyncComponent(() => import("vuetify/components"));
const DivideComponent = defineAsyncComponent(() => import("@/stories/bricks/Divide.vue"));
const LineLoadingComponent = defineAsyncComponent(() => import("@/stories/bricks/LineLoading.vue"));
const CardResultItem = defineAsyncComponent(() => import("@/stories/cards/CardResultItem.vue"));

const { orderDifficult } = storeToRefs(useCommonStore());
const props = defineProps<{ result?: TestDetail }>();
</script>
