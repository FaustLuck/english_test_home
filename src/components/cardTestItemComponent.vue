<template>
  <label class="item" :class="{speech:!isSpeech}">
    <a v-if="isSpeech">🔉</a>
    <input
      @change="update"
      @click="toVoice"
      v-show="type==='answer'"
      type="radio"
      :name="name"
      :checked="checked"
      :disabled="mode!=='test'"
    />
    <span class="item__title"
          :class="{
      right:mode!=='test' && type==='answer' && checked,
      wrong:mode!=='test' && type==='answer' && !checked
      }">{{ item }}</span>
  </label>
</template>

<script>
import { mapGetters } from "vuex";

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
  },
  computed: {
    isSpeech() {
      return this.mode === "test" && /[a-zA-Z]/g.test(this.item);
    },
    ...mapGetters("settings", ["getSpeech"]),
    mode() {
      return this.$route.name;
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
        let response = await fetch(this.getSpeech + this.item);
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

  & > * {
    margin: 0 .25rem;
  }

  &.speech {
    padding-left: 3rem;
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