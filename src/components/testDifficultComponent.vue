<template>
  <div
    class="difficult"
    :class="{
    pointer:isSettingsPage,
    open:isOpen
    }"
    v-if="partAnswers.length"
    @click="toOpen"
  >{{ difficult }}
  </div>
  <div v-if="isOpen">
    <card-test-component
      v-for="(answer,index) of partAnswers"
      :key="answer.answer"
      :test-item="{...answer,difficult}"
      :index="index"
    >
    </card-test-component>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "testDifficultComponent",
  components: {
    cardTestComponent: defineAsyncComponent(() => import("@/components/cardTestComponent"))
  },
  props: {
    difficult: String,
    partAnswers: Array
  },
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    mode() {
      return this.$route.name;
    },
    isSettingsPage() {
      return this.$route.name === "settings";
    }
  },
  methods: {
    toOpen() {
      if (!this.isSettingsPage) return;
      this.isOpen = !this.isOpen;
    }
  },
  created() {
    this.isOpen = !this.isSettingsPage;
  }
};
</script>

<style scoped lang="scss">
.difficult {
  text-align: center;
  font-size: 4rem;
  margin-top: 1rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 5px 0 0 #e9a66a;

  &.pointer {
    cursor: pointer;
    border-radius: 2rem;
    box-shadow: 0 0 10px 5px #e9a66a;

    &.open {
      box-shadow: none;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
  }
}
</style>