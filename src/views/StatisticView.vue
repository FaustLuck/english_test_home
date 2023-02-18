<template>
  <div class="statistic">
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
import { mapState } from "vuex";
export default {
  name: "StatisticUserView",
  components: {
    dateListComponent: defineAsyncComponent(() => import("@/components/dateListComponent")),
  },
  props: {
    sub: String
  },
  computed: {
    ...mapState("statistic", ["dateList"]),

  }
};
</script>

<style scoped lang="scss">
.statistic{
  display: flex;
  flex-direction: column-reverse;
}
</style>