<template>
  <span>{{ title }}</span>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";
import { mapState } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "FireShowView",
  computed: {
    ...mapState("test", ["answers"]),
    title() {
      return useRoute().name;
    }
  },
  created() {
    if (!this.answers) return useRouter().replace({name: "test"});
  }
};
</script>

<style lang="scss" scoped>

</style>