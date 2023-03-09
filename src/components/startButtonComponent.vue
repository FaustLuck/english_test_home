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
    ...mapState("auth", ["sub"]),
    ...mapState(["mode"]),
    title() {
      return (this.isTesting) ? "Завершить тест" : "Начать тест";
    }
  },
  methods: {
    ...mapMutations("test", ["changeTestStatus"]),
    ...mapMutations(["setLoading"]),
    ...mapActions("test", ["getTest"]),
    async changeStatus() {
      if (!this.isTesting) {
        if (this.mode !== "test") this.$router.replace({name: "test"});
        this.setLoading(true);
        await this.getTest({sub: this.sub});
        this.changeTestStatus(true);
        this.setLoading(false);
      } else {
        this.changeTestStatus(false);
        this.setLoading(true);
        this.$router.push({name: "result"});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>