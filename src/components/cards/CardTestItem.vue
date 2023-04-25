<template>
  <template v-if="!item">
    <v-card class="pa-3 my-3" color="default" elevation="5" rounded="lg">
      <v-row class="px-5 py-3 flex-sm-row flex-column">
        <v-col class="pa-0 align-self-center w-auto">
          <line-loading/>
        </v-col>
        <v-col align-self="center" class="d-flex flex-column pa-0">
          <line-loading v-for="i of 4" :key="i"/>
        </v-col>
      </v-row>
    </v-card>
  </template>

  <template v-else-if="item">
    <v-card class="pa-3 my-3" color="default" elevation="5" rounded="lg">
      <v-row class="px-5 py-3 flex-sm-row flex-column">
        <v-col class="pa-0 align-self-center w-auto font-weight-bold">
          {{ item.question }}
        </v-col>
        <v-col align-self="center" class="pa-0">
          <v-radio-group hide-details>
            <v-radio v-for="variant of item.answer" :key="variant"
                     :value="variant" :label="variant"
                     class="ml-1 w-auto"
                     @change="useTestStore().saveChoice(variant,item.key)"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card>
  </template>

</template>

<script setup lang="ts">
import { TestItem } from "@/types";
import { useTestStore } from "@/store/test";
import LineLoading from "@/components/bricks/LineLoading.vue";
import { useDisplay } from "vuetify";

const props = defineProps<{ item?: TestItem }>();
</script>