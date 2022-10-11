<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else-if="isStaticExists">
    <date-list-component
      v-for="[date,timeArray] of dateList[uid]"
      :key="date"
      :uid="uid"
      :date="date"
      :time-array="timeArray"
    >
    </date-list-component>
  </div>
  <div v-else>
    <h1>Пользователь не найден...</h1>
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
      isLoading: true,
      isStaticExists: null
    };
  },
  computed: {
    ...mapState("statistic", ["dateList"])
  },
  watch: {
    isStaticExists() {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("statistic", ["requestStatistic"]),
    ...mapActions("settings", ["requestTimer"]),
  },
  async created() {
    this.isStaticExists = await this.requestStatistic({uid: this.uid});
    if (this.isStaticExists) await this.requestTimer();
  }
};
</script>

<style scoped lang="scss">

</style>