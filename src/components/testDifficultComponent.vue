<template>
  <div v-if="partAnswers.length" class="difficult">{{ difficult }}</div>
  <card-test-component
    v-for="(answer,index) of partAnswers"
    :key="answer.answer"
    :test-item="{...answer,difficult}"
    :index="index"
  >
  </card-test-component>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "testDifficultComponent",
  components:{
    CardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
  },
  props:{
    difficult: String,
    partAnswers:Array
  }
};
</script>

<style scoped lang="scss">
.difficult {
  text-align: center;
  font-size: 60px;
  margin-top: 1rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;
}
</style>