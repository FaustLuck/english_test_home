<template>
  <label
    v-if="!editing"
    class="item"
    :class="{
    speech:!isSpeech,
    excluded:excluded
  }">
    <a v-if="isSpeech">🔉</a>
    <input
      @change="update"
      @click="toVoice"
      v-if="mode!=='settings'"
      v-show="type==='answer'"
      type="radio"
      :name="name"
      :checked="checked"
      :disabled="mode!=='test'"
    />
    <span class="item__title"
          :class="{
      right:rightColor,
      wrong:wrongColor
      }">{{ item }}</span>
  </label>
  <label class="item speech" v-else>
    <input-item
      :value="editingItem[type]"
      @changes="({newValue})=>editingItem[type] = newValue"
      @keydown.esc="clearEdit"
      @keydown.enter="finishEdit"
    ></input-item>
  </label>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import InputItem from "@/components/inputItem";

export default {
  name: "cardTestItemComponent",
  components: {InputItem},
  props: {
    item: {
      type: String,
      required: true
    },
    difficult: String,
    index: Number,
    type: String,
    checked: Boolean,
    right: Boolean,
    excluded: Boolean
  },
  computed: {
    ...mapState(["mode"]),
    ...mapState("test", ["SPEECH"]),
    ...mapState("settings", ["editingDifficult", "editingIndex", "editingItem"]),
    isSpeech() {
      return this.mode === "test" && /[a-zA-Z]/g.test(this.item);
    },
    name() {
      if (this.type === "question") return null;
      return `${this.difficult}${this.index}`;
    },
    editing() {
      return this.difficult === this.editingDifficult && this.index === this.editingIndex;
    },
    rightColor() {
      return this.right && this.type !== "question" && !["settings", "test"].includes(this.mode);
    },
    wrongColor() {
      return !this.right && this.type !== "question" && !["settings", "test"].includes(this.mode);
    }
  },
  methods: {
    ...mapMutations("settings", ["clearEdit"]),
    ...mapActions("settings", ["finishEdit"]),
    update() {
      if (this.type !== "answer") return;
      this.$emit("updateChoice", this.item);
    },
    async toVoice() {
      if (!this.isSpeech) return;
      try {
        let response = await fetch(this.SPEECH + this.item);
        if (response.ok) {
          let blob = await response.blob();
          let src = URL.createObjectURL(blob);
          const audio = new Audio(src);
          await audio.play();
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
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

  &.excluded {
    user-select: none;
    cursor: not-allowed;

    & > span {
      color: grey;
      text-decoration: line-through;
    }
  }

  & > input[type="text"] {
    width: 90%;
  }
}

</style>