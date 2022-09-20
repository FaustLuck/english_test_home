<template>
  <span>{{ title }}</span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FireShowView",
  computed: {
    ...mapState("test", ["answers"]),
    title() {
      return this.$route.name;
    }
  },
  created() {
    if (!this.answers) return this.$router.replace({name: "test"});
  }
};
</script>

<style lang="scss" scoped>

</style>