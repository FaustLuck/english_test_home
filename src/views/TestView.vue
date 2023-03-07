<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else-if="isTesting">
    <item-component
      v-for="(item,index) of test"
      :key="item.key"
    >
      <div class="card__column">
        <card-test-item-component
          :item="item.question"
          :difficult="item.difficult"
          :index="index"
          :type="'question'"
        ></card-test-item-component>
      </div>
      <div class="card__column">
        <card-test-item-component
          v-for="variant of item.answer"
          :key="variant"
          :item="variant"
          :difficult="item.difficult"
          :index="index"
          :type="'answer'"
          :checked="null"
          @updateChoice="saveChoice({choice:variant,key:item.key})"
        ></card-test-item-component>
      </div>
    </item-component>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "TestView",
  components: {
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
  },
  computed: {
    ...mapState("test", ["test", "isTesting", "SPEECH"]),
    ...mapState(["isLoading", "orderDifficult"]),
  },
  watch: {
    isTesting(value) {
      if (!value) return this.$router.push({name: "result"});
    }
  },
  methods: {
    ...mapMutations("test", ["saveChoice"]),
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: 2rem 0;
  padding: .5rem;
  background-color: #FFDAB9;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &__column {
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
    }
  }
}

.item {
  display: flex;
  align-items: center;
  cursor: pointer;
  text-align: left;

  & > * {
    margin: 0 .25rem;
  }

  &.speech {
    padding-left: 3.25rem;
    @media screen and (max-width: 768px) {
      padding-left: 0;
    }
  }

  & > input[type="radio"] {
    transform: scale(2, 2);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      transform: scale(1.5, 1.5);
    }
  }

  &__title {
    &.right {
      color: #008000;
    }

    &.wrong {
      color: #FF0000;
    }
  }
}


</style>