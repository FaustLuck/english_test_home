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
          @updateChoice="saveChoice(variant,item.key)"
        ></card-test-item-component>
      </div>
    </item-component>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { defineAsyncComponent } from "vue";
import { testStore } from "@/store/testStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "TestView",
  components: {
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent.vue")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent.vue")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue")),
  },
  computed: {
    ...mapState(testStore, ["test", "isTesting", "SPEECH"]),
    ...mapState(mainStore, ["isLoading", "orderDifficult"]),
  },
  watch: {
    isTesting(value) {
      if (!value) return this.$router.push({name: "result"});
    }
  },
  methods: {
    ...mapActions(testStore, ["saveChoice"]),
  }
};
</script>

<style lang="scss" scoped>
</style>