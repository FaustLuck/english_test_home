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
      :disabled="mode==='result'"
    />
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
  }

  & > input[type="radio"] {
    transform: scale(2, 2);
    cursor: pointer;
  }
}

</style>