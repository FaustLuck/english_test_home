<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <date-list-component
      v-for="[date,timeArray] of dateList[uid]"
      :key="date"
      :uid="uid"
      :date="date"
      :time-array="timeArray"
    >
    </date-list-component>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "StatisticUserView",
  components: {
    PreloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    DateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent")),
  },
  props: {
    uid: String
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapState("statistic", ["dateList"])
  },
  watch: {
    dateList(value) {
      if (Object.keys(value).length) this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("statistic", ["requestStatistic"]),
    ...mapActions("settings", ["requestTimer"]),
  },
  created() {
    this.requestStatistic({uid: this.uid});
    this.requestTimer();
  }
};
</script>

<style scoped lang="scss">

</style>