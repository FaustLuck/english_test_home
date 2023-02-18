<template>
  <title-component
    :title="`${dateString} Тестов: ${count}`" @click="getTime">
    <template v-slot:default="slotProps">
      <test-info-component
        v-for="(testInfo,timestamp) of timeList"
        :key="timestamp"
        :timestamp="+datestamp+ +timestamp"
        :testInfo="testInfo"
        :sub="sub"
        :height-title="slotProps.heightTitle"
      ></test-info-component>
    </template>
  </title-component>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { getDate } from "@/utils/utils";

export default {
  name: "dateListComponent",
  components: {
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent")),
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent"))
  },
  props: {
    count: Number,
    datestamp: String,
    sub:String
  },
  data() {
    return {
      timeList: null,
    };
  },
  computed: {
    ...mapState(["orderDifficult"]),
    dateString() {
      return getDate(+this.datestamp)[0];
    },
  },
  methods: {
    ...mapActions("statistic", ["getTimeList"]),
    async getTime() {
     if(!this.timeList) this.timeList = await this.getTimeList({sub: this.$route.params.sub, date: this.datestamp});
    }
  }
};
</script>

<style scoped lang="scss">

</style>