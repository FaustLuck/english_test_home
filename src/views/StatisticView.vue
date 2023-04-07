<template>
  <preloader-component></preloader-component>
  <div class="statistic" v-if="dateList">
    <date-list-component
      v-for="(count,datestamp) in dateList"
      :key="datestamp"
      :count="count"
      :datestamp="datestamp"
      :sub="sub"
    >
    </date-list-component>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { statisticStore } from "@/store/statisticStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "StatisticUserView",
  components: {
    preloaderComponent:defineAsyncComponent(() => import("@/components/preloaderComponent.vue")),
    dateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent.vue")),
  },
  props: {
    sub: String
  },
  computed: {
    ...mapState(statisticStore, ["dateList"]),
  },
  methods: {
    ...mapActions(statisticStore, ["getDateList"]),
    ...mapActions(mainStore, ["setLoading"])
  },
  async created() {
    await this.getDateList(this.$route.params.sub);
    this.setLoading(false);
  }
};
</script>

<style scoped lang="scss">
.statistic{
  display: flex;
  flex-direction: column-reverse;
}
</style>