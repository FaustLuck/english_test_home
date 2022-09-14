<template>
  <label class="item" :class="{speech:!isSpeech}">
    <a v-if="isSpeech">🔉</a>
    <input
      v-show="type==='answer'"
      @click="toVoice"
      @change="update"
      type="radio"
      :name="difficult+index"/>
    <span>{{ item }}</span>
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
    difficult: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    type: String,
    choice: String
  },
  computed: {
    isSpeech() {
      return /[a-zA-Z]/g.test(this.item);
    },
    ...mapGetters("settings", ["getSpeech"]),
  },
  methods: {
    update() {
      if (this.type !== "answer") return;
      this.$emit("changeAnswer", this.item);
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
    padding-left: 2rem;
  }

  & > input[type="radio"] {
    transform: scale(2, 2);
  }
}

</style>