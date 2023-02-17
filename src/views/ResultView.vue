<template>
  <header-component></header-component>
  <preloader-component v-if="isLoading"></preloader-component>
  <test-info-component v-else
                       :timestamp="timestamp"
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
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent")),
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
  },
  watch: {
    isLogin() {
      this.sendAnswer();
    }
  },
  computed: {
    ...mapState("test", ["result", "timestamp", "timeSpent"]),
    ...mapState(["isLoading"]),
    // ...mapState("auth", ["isLogin", "uid"]),
  },
  methods: {
    // ...mapActions("test", ["sendAnswersToDB"]),
    show(nameShow) {
      setTimeout(() => {
        this.$router.replace({name: `${nameShow}-show`});
      }, 3000);
    },

    // sendAnswer() {
    //   if (this.isLogin) this.sendAnswersToDB({uid: this.uid});
    // }
  }
};
</script>

<style lang="scss" scoped>

</style>