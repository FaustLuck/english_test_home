<template>
  <v-container class="pa-sm-3 pa-0">

    <template v-for="difficult of orderDifficult">

      <template v-if="!result">
        <divide :loading="true"/>
        <v-row class="d-flex align-center my-1"
               v-for="i of 2" :key="i">
          <v-col align-self="center" class="d-flex flex-column pa-0">
            <line-loading/>
          </v-col>
          <v-col align-self="center" class="d-flex flex-column pa-0">
            <line-loading/>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="result[difficult]?.length>0">
        <divide :loading="false">
          <v-card-title class="font-weight-bold">{{ difficult }}</v-card-title>
        </divide>
        <card-result-item v-for="item of result[difficult]" :key="item.question" :item="item"></card-result-item>
      </template>

    </template>
  </v-container>

</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCommonStore } from "@/store/common";
import { TestDetail } from "@/types";
import Divide from "@/components/bricks/Divide.vue";
import LineLoading from "@/components/bricks/LineLoading.vue";
import CardResultItem from "@/components/cards/CardResultItem.vue";

const { orderDifficult } = storeToRefs(useCommonStore());
const props = defineProps<{ result?: TestDetail }>();
</script>
