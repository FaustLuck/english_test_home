<template>
  <title-component
    :title="`${dateString} Тестов: ${counter}`" @click="getTime">
    <template v-slot:default="slotProps">
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

export default {
  name: "dateListComponent",
  components: {
    titleComponent: defineAsyncComponent(() => import("@/components/titleComponent.vue")),
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent.vue"))
  },
  data() {
    return {
      timeList: null,
    };
  },
};
</script>

<style scoped lang="scss">
.info__container {
  display: flex;
  flex-direction: column-reverse;
}
</style>