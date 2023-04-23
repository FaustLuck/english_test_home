<template>
  <v-sheet
          color="transparent"
          rounded="lg"
          class="d-flex align-center my-1"
          :class="{wrong:isWrong,right:isRight}"
  >
    <v-col>
      {{ item.question }}
    </v-col>
    <v-col>
      <v-radio-group hide-details v-model="choice">
        <v-row class="d-flex">
          <v-radio :value="item.answer"
                   class="ma-1 flex-grow-0"
                   disabled/>
          <v-label class="title-right" :text="item.answer"/>
        </v-row>
        <v-row v-if="isWrong && choice">
          <v-radio :value="item.choice"
                   class="ma-1 flex-grow-0"
                   disabled/>
          <v-label class="title-wrong" :text="choice"/>
        </v-row>
      </v-radio-group>
    </v-col>
  </v-sheet>
</template>

<script setup lang="ts">
import { ResultItem } from "@/types";
import { computed } from "vue";


const { item } = defineProps<{ item: ResultItem }>();

const choice = computed(() => (item?.choice) ? item.choice : "");

const isRight = computed(() => item?.choice === item.answer);
const isWrong = computed(() => !isRight.value);

</script>


<style lang="scss" scoped>
.wrong {
  background-color: #ff8c69 !important;
}

.right {
  background-color: #8fbc8f !important;
}

.title {
  &-right {
    color: #008000;
  }

  &-wrong {
    color: #FF0000;
  }
}
</style>
