<template>
  <preloader-component v-if="!dateList"></preloader-component>
  <div class="statistic" v-else>
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
import { mapActions, mapState } from "vuex";
export default {
  name: "StatisticUserView",
  components: {
    preloaderComponent:defineAsyncComponent(() => import("@/components/preloaderComponent")),
    dateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent")),
  },
  props: {
    sub: String
  },
  computed: {
    ...mapState("statistic", ["dateList"]),
  },
  methods:{
    ...mapActions('statistic',['getDateList'])
  },
 async created() {
     await this.getDateList(this.$route.params.sub)
  }
};
</script>

<style scoped lang="scss">
.statistic{
  display: flex;
  flex-direction: column-reverse;
}
</style>