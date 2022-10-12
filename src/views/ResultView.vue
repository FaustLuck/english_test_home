<template>
  <header-component></header-component>
  <test-info-component
    :timestamp="timestamp"
    :answers="{test:answers,timeSpent}"
    @show="show"
    @click="activeTimestamp=timestamp"
  >
  </test-info-component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex/dist/vuex.esm-browser.prod";

export default {
  name: "ResultView",
  components: {
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent")),
    headerComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
  },
  data() {
    return {
      activeTimestamp: 0
    };
  },
  watch: {
    isLogin() {
      this.sendAnswer();
    }
  },
  computed: {
    ...mapState("test", ["answers", "timestamp", "timeSpent"]),
    ...mapState("auth", ["isLogin", "uid"]),
  },
  methods: {
    ...mapActions("test", ["sendAnswersToDB"]),
    show(nameShow) {
      setTimeout(() => {
        this.$router.replace({name: `${nameShow}-show`});
      }, 3000);
    },
    sendAnswer() {
      if (this.isLogin) this.sendAnswersToDB({uid: this.uid});
    }
  },
  created() {
    this.sendAnswer();
  }
};
</script>

<style lang="scss" scoped>

</style>