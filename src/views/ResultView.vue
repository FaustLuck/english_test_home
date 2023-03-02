<template>
  <test-info-component
    :timestamp="timestamp"
    :sub="sub"
    @show="show"
  >
  </test-info-component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";

export default {
  name: "ResultView",
  components: {
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent"))
  },
  computed: {
    ...mapState("test", ["timestamp"]),
    ...mapState(["isLoading"]),
    ...mapState("auth", ["sub"])
  },
  methods: {
    show(nameShow) {
      setTimeout(() => {
        this.$router.replace({name: `${nameShow}-show`});
      }, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>