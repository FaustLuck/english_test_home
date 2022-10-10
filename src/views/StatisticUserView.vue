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
    ...mapState("statistic", ["dateList"]),
    ...mapState("auth", ["isLogin"])
  },
  watch: {
    isLogin(value) {
      if (!value) return;
      this.requestStatistic({uid: this.uid});
    },
    dateList(value) {
      if (Object.keys(value).length) this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("statistic", ["requestStatistic"])
  },
  created() {
    console.log(this.isLogin)
    if (!this.isLogin) this.$router.replace({name: "test"});
  },
  beforeRouteEnter(to, from, next) {
    (from.name === "statistic") ? next(vm => vm.isLoading = false) : next();
  }
};
</script>

<style scoped lang="scss">

</style>