<template>
  <div class="card">
    <div class="card__col">
      <card-test-item-component
        :item="testItem.question"
        :difficult="testItem.difficult"
        :index="index"
        :type="'question'"
      ></card-test-item-component>
    </div>
    <div class="card__col">
      <card-test-item-component
        v-for="answer of testItem.answer"
        :key="answer"
        :index="index"
        :difficult="testItem.difficult"
        :item="answer"
        :type="'answer'"
        :choice="testItem.choice"
        @changeAnswer="(item)=>this.$emit('changeAnswer', item, this.index)"
      ></card-test-item-component>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "cardTestComponent",
  components: {
    CardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent"))
  },
  props: {
    testItem: {
      type: Object,
      required: true
    },
    index: Number
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: 2rem 0;
  padding: .5rem;

  &__col {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
}
</style>