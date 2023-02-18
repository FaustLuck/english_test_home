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
  <h1 v-else>Пользователь не найден...</h1>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "StatisticUserView",
  components: {
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent")),
    dateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent")),
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
    ...mapState("statistic", ["dateList"]),
    ...mapState("auth", ["sub"])
  },
  watch: {
    isStaticExists() {
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("statistic", ["getDateList"])
  },
  async created() {
    this.isStaticExists = await this.getDateList({sub: this.sub});
    if (this.isStaticExists) await this.requestTimer();
  }
};
</script>

<style scoped lang="scss">
.statistic{
  display: flex;
  flex-direction: column-reverse;
}
</style>