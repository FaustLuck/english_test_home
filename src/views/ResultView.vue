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
    HeaderComponent: defineAsyncComponent(() => import("@/components/headerComponent")),
  },
  data() {
    return {
      activeTimestamp: 0
    };
  },
  watch: {
    async isLogin(value) {
      if (value) await this.sendAnswersToDB({uid: this.uid});
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
    }
  },
  async created() {
    if (this.isLogin) await this.sendAnswersToDB({uid: this.uid});
  },
  beforeRouteEnter(to, from, next) {
    (from.name !== "test") ? next({name: "test"}) : next();
  }
};
</script>

<style lang="scss" scoped>

</style>