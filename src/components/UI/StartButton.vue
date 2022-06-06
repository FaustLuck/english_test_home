<template>
  <header>
    <div v-if="path !== '/'"></div>
    <input type="button" :value="title" @click="changeReady" />
    <div v-if="path !== '/'"></div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "StartButton",
  data() {
    return {
      title: "Начать тест",
      path: this.$router.currentRoute.value.path,
    };
  },
  computed: {
    ...mapState(["readyToTest"]),
  },
  watch: {
    readyToTest: function (value) {
      this.changeTitle(value);
    },
  },
  methods: {
    changeReady() {
      this.path !== "/"
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
header {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;

  @media screen and (max-width: 768px) {
    position: sticky;
    top: 5rem;
    z-index: 2;
    background: peachpuff;
  }

  & > * {
    width: 100%;
    text-align: center;
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
