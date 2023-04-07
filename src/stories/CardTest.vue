<template>

  <template v-if="!item">
    <v-card class="pa-3 my-3" color="default" elevation="5" rounded="lg">
      <v-row class="px-5 py-3">
        <v-col align-self="center" class="d-flex flex-column pa-0">
          <line-loading-component/>
        </v-col>
        <v-col align-self="center" class="d-flex flex-column pa-0">
          <line-loading-component v-for="i of 4" :key="i"/>
        </v-col>
      </v-row>
    </v-card>
  </template>

  <template v-else-if="item">
    <v-card class="pa-3 my-3" color="default" elevation="5" rounded="lg">
      <v-row class="px-5 py-3">
        <v-col align-self="center" class="pa-0">
          {{ item.question }}
        </v-col>
        <v-col align-self="center" class="pa-0">
          <v-radio-group hide-details>
            <v-radio v-for="variant of item.answer" :key="variant"
                     :value="variant" :label="variant"
                     class="ma-1"
                     @change="useTestStore().saveChoice(variant,item.key)"/>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card>
  </template>

</template>

<script setup lang="ts">
import { TestItem } from "@/types/test";
import { useTestStore } from "@/store/test";
import LineLoadingComponent from '@/stories/LineLoading.vue'

interface cardComponentProps {
  loading?: boolean;
  item?: TestItem;
}

const props = defineProps<cardComponentProps>();

</script>

<style lang="scss" scoped>
.glow-text {
  animation: glow 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #FFDAB9 10%, rgb(255, 255, 255), #FFDAB9 90%);
  color: transparent;
  user-select: none;
  border-radius: 8px;
}

@keyframes glow {
  from, to {
    opacity: .5;
  }
  50% {
    opacity: 0;
  }
}
</style>