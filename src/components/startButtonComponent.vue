<template>
  <input type="button" :value="title" @click="changeStatus"/>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "startButtonComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState("test", ["isTesting"]),
    title() {
      return (this.isTesting) ? "Завершить тест" : "Начать тест";
    },
    mode() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapMutations("test", ["changeTestStatus"]),
    ...mapMutations(["setLoading"]),
    ...mapActions("test", ["getTest", "checkTest"]),
    async changeStatus() {
      if (!this.isTesting) {
        if (this.mode !== "test") this.$router.replace({name: "test"});
        this.setLoading(true);
        await this.getTest({sub: ""});
        this.changeTestStatus(true);
        this.setLoading(false);
      } else {
        this.changeTestStatus(false);
        this.$router.push({name: "result"});
        this.setLoading(true);
        await this.checkTest();
        this.setLoading(false);
      }
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