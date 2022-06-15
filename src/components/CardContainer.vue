<template>
  <div class="container">
    <card-item
      :key="item.question"
      :prop="'question'"
      :item="item.question"
      :index="index"
      :difficult="difficult"
      :mode="mode"
      :editing="editing"
      @editRecord="editRecord"
    ></card-item>
    <div>
      <card-item
        v-for="(answer, variant) of localAnswer(item.answer)"
        :key="answer"
        :prop="'answer'"
        :item="answer"
        :index="index"
        :difficult="difficult"
        :variant="variant"
        :checked="checked(variant)"
        :correct="item.index === variant"
        :mode="mode"
        :editing="editing"
        @editRecord="editRecord"
      ></card-item>
    </div>
    <tool-menu
      v-if="mode === 'settings'"
      :index="index"
      @addRecord="() => this.$emit('addRecord')"
      @changeEditing="(flag) => (this.editing = flag)"
      @deleteRecord="deleteRecord"
    ></tool-menu>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem";
import ToolMenu from "@/components/ToolMenu";

export default {
  name: "CardContainer",
  props: {
    item: Object,
    difficult: String,
    index: Number,
    mode: String,
  },
  components: { ToolMenu, CardItem },
  data() {
    return {
      editing: false,
    };
  },
  created() {
    if (this.index === -1) this.editing = true;
  },
  methods: {
    checked(variant) {
      return this.item.answer.length - this.item?.index - 1 === variant;
    },
    localAnswer(answer) {
      if (typeof answer === "string") return [answer];
      return answer;
    },
    deleteRecord() {
      if (this.mode !== "settings") return;
      this.$store.commit("settings/DELETE_RECORD", {
        difficult: this.difficult,
        item: this.item,
      });
    },
    editRecord({ record, prop }) {
      if (this.mode !== "settings") return;
      if (this.index === -1) return this.updateNewItem(record, prop);
      this.$store.commit("settings/EDIT_RECORD", {
        difficult: this.difficult,
        index: this.index,
        record,
        prop,
      });
    },
    updateNewItem(record, prop) {
      this.$emit("updateNewItem", {
        diff: this.difficult,
        record,
        prop,
      });
    },
  },
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  font-size: 2rem;
  margin: -1px;
  border: 1px solid black;
  padding: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: flex-start;
  }

  &:hover > .tool {
    opacity: 1;
  }
}
</style>
