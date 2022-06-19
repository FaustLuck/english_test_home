<template>
  <div class="start_btn">
    <div v-if="path !== 'test'"></div>
    <input type="button" :value="title" @click="changeReady" />
    <div v-if="path !== 'test'"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "StartButton",
  data() {
    return {
      title: "Начать тест",
      path: this.$router.currentRoute.value.name,
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
.start_btn {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  border-bottom: 1px solid black;

  @media screen and (max-width: 768px) {
    position: sticky;
    top: 4rem;
    z-index: 2;
    background: peachpuff;
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