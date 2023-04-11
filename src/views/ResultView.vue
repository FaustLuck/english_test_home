<template>
  <card-result-info-component
          :timestamp="timestamp"
          :result="result"
          :correct="correct"
          @show="show"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";

export default {
  name: "ResultView",
  components: {
    CardResultInfoComponent: defineAsyncComponent(() => import("@/stories/CardResultInfo.vue"))
  },
  watch: {
    async sub(value) {
      if (value) await this.saveTest(value);
    },
  },
  computed: {
    ...mapState(useTestStore, ["timestamp", "result", "correct"]),
    ...mapState(useAuthStore, ["sub"])
  },
  methods: {
    ...mapActions(useTestStore, ["saveTest", "getVerifiedTest"]),
    ...mapActions(useLoadingStore, ["setLoading"]),
    show(nameShow) {
      setTimeout(() => {
        this.$router.replace({name: `${nameShow}-show`});
      }, 3000);
    }
  },
  async mounted() {
    await this.getVerifiedTest(this.sub);
    this.setLoading(false);
    if (this.sub) {
      await this.saveTest(this.sub);
    }
  }
};
</script>