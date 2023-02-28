<template>
  <label class="item" :class="{
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
      disabled="mode!=='test'"
    />
    <span class="item__title"
          :class="{
      right:right && type!=='question' && mode!=='settings',
      wrong:!right && type!=='question' && mode!=='settings'
      }">{{ item }}</span>
  </label>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "cardTestItemComponent",
  props: {
    item: {
      type: String,
      required: true
    },
    name: String,
    type: String,
    choice: String,
    checked: Boolean,
    right: Boolean,
    excluded: Boolean
  },
  computed: {
    ...mapState(['mode']),
    ...mapState("test", ["SPEECH"]),
    isSpeech() {
      return this.mode === "test" && /[a-zA-Z]/g.test(this.item);
    }
  },
  methods: {
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
  }
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
}

</style>