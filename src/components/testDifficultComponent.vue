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
      @dblclick="startEdit({difficult, index})"
    >
      <div class="item__column">
        <card-test-item-component
          :item="item.question"
          :difficult="difficult"
          :index="index"
          :excluded="item?.excluded"
          :type="'question'"
        ></card-test-item-component>
      </div>
      <div class="item__column">
        <card-test-item-component
          :type="'answer'"
          :difficult="difficult"
          :index="index"
          :item="item.answer"
          :excluded="item?.excluded"
          :checked="item.answer===item?.choice"
          :right="true"
        >
        </card-test-item-component>
        <card-test-item-component
          v-if="item?.choice && item.answer!==item?.choice"
          :type="'answer'"
          :difficult="difficult"
          :index="index"
          :item="item?.choice"
          :checked="true"
          :right="false"
        >
        </card-test-item-component>
      </div>
      <tool-component
        v-if="mode==='settings'"
        :index="index"
        :difficult="difficult"
        :excluded="item?.excluded"
        :edited="item?.edited"
        :included="item?.included"
      ></tool-component>
    </item-component>
  </title-component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "testDifficultComponent",
  components: {
    toolComponent: defineAsyncComponent(() => import("@/components/toolComponent")),
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent")),
    cardTestItemComponent: defineAsyncComponent(() => import("@/components/cardTestItemComponent")),
    itemComponent: defineAsyncComponent(() => import("@/components/itemComponent"))
  },
  props: {
    difficult: String,
    partAnswers: Array,
  },
  computed: {
    ...mapState(["mode"])
  },
  methods: {
    ...mapMutations("settings", ["startEdit"])
  }
}
</script>

<style scoped lang="scss">
.item__column {
  width: 50%;
}
</style>