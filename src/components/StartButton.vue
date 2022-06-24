<template>
  <div class="start_btn" :class="{ test: mode === 'test' }">
    <div v-if="mode !== 'test'"></div>
    <input type="button" :value="title" @click="changeReady" />
    <div v-if="mode !== 'test'"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "StartButton",
  data() {
    return {
      title: "Начать тест",
    };
  },
  computed: {
    ...mapState(["readyToTest"]),
    mode() {
      return `${this.$router.currentRoute.value.name}`;
    },
  },
  watch: {
    readyToTest: function (value) {
      this.changeTitle(value);
    },
    mode: function (value) {
      if (value !== "test") this.$store.dispatch("changeReady", false);
    },
  },
  methods: {
    changeReady() {
      this.mode !== "test"
        ? this.$router.push("/")
        : this.$store.dispatch("changeReady", !this.readyToTest);
    },
    changeTitle(value) {
      this.title = value ? "Завершить тест" : "Начать тест";
    },
  },
};
</script>

<style scoped lang="scss">
.start_btn {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  background: peachpuff;
  border-bottom: 1px solid black;

  &.test {
    border-bottom: none;
  }

  @media screen and (max-width: 768px) {
    top: 4rem;
  }

  @media screen and (max-width: 768px) {
    & > *:nth-child(3) {
      width: 0;
    }
  }
}

input[type="button"] {
  font-size: 2rem;
  font-family: "serif";
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
</style>