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
    <input-component
      :value="editingItem[type]"
      @changes="({newValue})=>editingItem[type] = newValue"
      @keydown.esc="clearEdit"
      @keydown.enter="finishEdit"
    ></input-component>
  </label>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { defineAsyncComponent } from "vue";
import { testStore } from "@/store/testStore";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "cardTestItemComponent",
  components: {
    inputComponent: defineAsyncComponent(() => import("@/components/inputComponent.vue"))
  },
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
    ...mapState(mainStore, ["mode"]),
    ...mapState(testStore, ["SPEECH"]),
    ...mapState(settingsStore, ["editingDifficult", "editingIndex", "editingItem"]),
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
    ...mapActions(settingsStore, ["clearEdit", "finishEdit"]),
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

input[type="radio"] {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }

}

</style>