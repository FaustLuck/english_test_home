<template>
  <title-component
    :title="`${dateString} Тестов: ${count}`" @click="getTime">
    <template v-slot:default="slotProps">
      <item-preloader v-if="!timeList"></item-preloader>
      <div v-else>
        <test-info-component
          v-for="(testInfo,timestamp) of timeList"
          :key="timestamp"
          :timestamp="+datestamp+ +timestamp"
          :testInfo="testInfo"
          :sub="sub"
          :height-title="slotProps.heightTitle"
        ></test-info-component>
      </div>
    </template>
  </title-component>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { getDate } from "@/utils/utils";
import { statistic } from "@/store/statistic";
import { mapActions, mapState } from "pinia";
import { main } from "@/store/main";

export default {
  name: "dateListComponent",
  components: {
    itemPreloader: defineAsyncComponent(() => import("@/components/itemPreloader.vue")),
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent.vue")),
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent.vue"))
  },
  props: {
    count: Number,
    datestamp: String,
    sub: String
  },
  data() {
    return {
      timeList: null,
    };
  },
  computed: {
    ...mapState(main, ["orderDifficult"]),
    dateString() {
      return getDate(+this.datestamp)[0];
    },
  },
  methods: {
    ...mapActions(statistic, ["getTimeList"]),
    async getTime() {
      if (!this.timeList) this.timeList = await this.getTimeList({sub: this.$route.params.sub, date: this.datestamp});
    }
  }
};
</script>

<style scoped lang="scss">

</style>