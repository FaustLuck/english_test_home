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
import { mapState } from "pinia";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";

export default {
  name: "ResultView",
  components: {
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent.vue"))
  },
  computed: {
    ...mapState(useTestStore, ["timestamp"]),
    ...mapState(useAuthStore, ["sub"])
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