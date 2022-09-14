<template>
  <input type="button" :value="title" @click="changeStatus"/>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "startButtonComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState("test", ["isTesting"]),
    title() {
      return (this.isTesting) ? "Завершить тест" : "Начать тест";
    }
  },
  methods: {
    ...mapMutations("test", ["changeTestStatus"]),
    changeStatus() {
      this.changeTestStatus(!this.isTesting);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="button"] {
  font-size: 2rem;
  padding: 0 .5rem;
  font-family: "serif";
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
}
</style>