<template>
  <title-component
    v-if="partAnswers.length"
    :title="difficult"
    :must-is-open="mode!=='settings'"
    :must-is-top="mode!=='settings'"
  >
    <item-component
      v-for="(item,index) of partAnswers"
      :key="item.question"
      :test-item="item"
    >
      <div class="item__column">
        <card-test-item-component
          :item="item.question"
          :type="'question'"
        ></card-test-item-component>
      </div>
      <div class="item__column">
        <card-test-item-component
          :type="'answer'"
          :name="difficult+index"
          :item="item.answer"
          :checked="item.answer===item?.choice"
          :right="true"
        >
        </card-test-item-component>
        <card-test-item-component
          v-if="item?.choice && item.answer!==item?.choice"
          :type="'answer'"
          :name="difficult+index"
          :item="item?.choice"
          :checked="true"
          :right="false"
        >
        </card-test-item-component>
      </div>
      <tool-component
      :index="index"
      ></tool-component>
    </item-component>
  </title-component>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "testDifficultComponent",
  components: {
    ToolComponent:defineAsyncComponent(() => import("@/components/toolComponent")),
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent")),
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent"))
  },
  props: {
    difficult: String,
    partAnswers: Array,
  },
  computed: {
    mode() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped lang="scss">
.item__column {
  width: 50%;
}
</style>