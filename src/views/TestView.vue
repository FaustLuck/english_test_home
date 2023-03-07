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
</style>