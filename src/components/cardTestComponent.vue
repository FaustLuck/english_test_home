<template>
  <div class="card"
  :class="{
    right:right,
    wrong:!right
  }">
    <div class="card__col">
      <card-test-item-component
        :item="testItem.question"
        :type="'question'"
      ></card-test-item-component>
    </div>
    <div v-if="mode==='test'" class="card__col">
      <card-test-item-component
        v-for="answer of testItem.answer"
        :key="answer"
        :name="testItem.difficult+index"
        :item="answer"
        :type="'answer'"
        :choice="testItem.choice"
        @updateChoice="updateChoice"
      ></card-test-item-component>
    </div>

    <div v-else class="card__col">
      <card-test-item-component
        :type="'answer'"
        :name="testItem.difficult+index"
        :item="testItem.answer"
        :checked="testItem.answer===testItem.choice"
        :right="true"
      >
      </card-test-item-component>
      <card-test-item-component
        v-if="testItem?.choice && testItem.answer!==testItem.choice"
        :type="'answer'"
        :name="testItem.difficult+index"
        :item="testItem.choice"
        :checked="true"
        :right="false"
      >
      </card-test-item-component>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapMutations } from "vuex";

export default {
  name: "cardTestComponent",
  components: {
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent"))
  },
  props: {
    testItem: {
      type: Object,
      required: true
    },
    index: Number
  },
  computed: {
    mode() {
      return this.$route.name;
    },
    right(){
      return this.mode!=='test'&& this.testItem.answer===this.testItem.choice
    }
  },
  methods: {
    ...mapMutations("test", ["saveChoice"]),
    updateChoice(choice) {
      this.saveChoice({
        choice,
        question: this.testItem.question,
        difficult: this.testItem.difficult
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: .5rem 0;
  padding: .5rem;
  background-color: #FFDAB9;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &.right{
    background-color: #8fbc8f;
  }

  &.wrong{
    background-color: #ff8c69;
  }

  &__col {
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
    }
  }
}
</style>