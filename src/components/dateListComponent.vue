<template>
  <title-component
    :title="`${dateString} Тестов: ${counter}`" @click="getTime">
    <template v-slot:default="slotProps">
      <item-preloader v-if="!timeList"></item-preloader>
      <div class="info__container" v-else>
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
import { mapActions } from "pinia";
import { useHistoryStore } from "@/store/history";

export default {
  name: "dateListComponent",
  components: {
    itemPreloader: defineAsyncComponent(() => import("@/components/itemPreloader.vue")),
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent.vue")),
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent.vue"))
  },
  props: {
    counter: Number,
    datestamp: String,
    sub: String
  },
  data() {
    return {
      timeList: null,
    };
  },
  computed: {
    dateString() {
      return getDate(+this.datestamp)[0];
    },
  },
  methods: {
    ...mapActions(useHistoryStore, ["getTimeList"]),
    async getTime() {
      if (!this.timeList) this.timeList = await this.getTimeList(this.$route.params.sub, this.datestamp);
    }
  }
};
</script>

<style scoped lang="scss">
.info__container {
  display: flex;
  flex-direction: column-reverse;
}
</style>