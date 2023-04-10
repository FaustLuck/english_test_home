<template>
  <preloader-component></preloader-component>
  <div class="statistic" v-if="dateList">
    <date-list-component
            v-for="(data,datestamp) in dateList[sub]"
            :key="datestamp"
            :counter="data.counter"
            :datestamp="datestamp"
            :sub="sub"
    >
    </date-list-component>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useLoadingStore } from "@/store/loading";
import { useHistoryStore } from "@/store/history";

export default {
  name: "StatisticUserView",
  components: {
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue")),
    dateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent.vue")),
  },
  props: {
    sub: String
  },
  computed: {
    ...mapState(useHistoryStore, ["dateList"]),
  },
  methods: {
    ...mapActions(useHistoryStore, ["getDateList"]),
    ...mapActions(useLoadingStore, ["setLoading"])
  },
  async created() {
    if (!this.dateList[this.sub]) {
      await this.getDateList(this.$route.params.sub);
    }
    this.setLoading(false);
  }
};
</script>

<style scoped lang="scss">
.statistic {
  display: flex;
  flex-direction: column-reverse;
}
</style>