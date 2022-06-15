<template>
  <label @click="update" class="item">
    <a @click="toSpeech" v-if="/[a-zA-Z]/g.test(item) && mode === 'test'">🔉</a>
    <input
      v-if="mode !== 'settings'"
      type="radio"
      :class="{}"
      :name="difficult + '_' + index"
      :value="localItem"
      v-model="check"
      :checked="checked"
      :disabled="disabled"
    />
    <input
      @click="toSpeech"
      type="text"
      :class="{
        editing: editing,
        correct: correct === true && ['statistic', 'result'].includes(mode),
        wrong: correct === false && ['statistic', 'result'].includes(mode),
      }"
      :readonly="!editing"
      v-model="localItem"
      v-on:blur="updateItem"
    />
  </label>
</template>

<script>
import { speech } from "@/utils";

export default {
  name: "CardItem",
  props: {
    item: String,
    difficult: String,
    index: Number,
    variant: Number,
    checked: Boolean,
    mode: String,
    correct: {
      type: Boolean,
      default: null,
    },
    prop: String,
    editing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      check: "",
      value: "",
      localItem: this.item ,
    };
  },
  computed: {
    disabled() {
      return this.mode !== "test";
    },
  },
  watch: {
    localItem(value) {
      let regexp = /[^a-zA-Zа-яА-ЯёЁ.,!?\s]/g;
      if (regexp.exec(value)) this.localItem = value.replaceAll(regexp, "");
    },
    editing(value) {
      if (value) return;
      this.updateItem();
    },
  },
  methods: {
    updateItem() {
      this.$emit("editRecord", {
        record: this.localItem,
        prop: this.prop,
      });
    },
    toSpeech() {
      if (this.mode === "test" && /[a-zA-Z]/g.test(this.item))
        return speech(this.localItem);
    },
    update() {
      if (this.mode !== "test") return;
      this.check = this.localItem;
      this.$store.commit("UPDATE_ANSWER", {
        answer: this.check,
        difficult: this.difficult,
        index: this.index,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;

  @media (any-hover: hover) {
    & > * {
      cursor: pointer !important;
    }
  }

  input[type="text"] {
    height: 2rem;
    background-color: transparent;
    outline: 0;
    border-width: 0;
    font-family: "serif";
    font-size: 1.5rem;
    padding-left: 0.5rem;
    width: 100%;
    cursor: default;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }

    &.editing {
      border: 1px solid black;
      margin: -1px;
    }

    input[type="radio"] {
      transform: scale(2, 2);
      @media screen and (max-width: 768px) {
        transform: scale(1, 1);
      }
    }
  }

  .wrong {
    color: red;
    font-weight: 700;
  }

  .correct {
    color: green;
    font-weight: 700;
  }
}
</style>
