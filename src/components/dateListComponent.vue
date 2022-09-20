<template>
  <div class="date"
       :class="{open:activeDate===date}"
       @click="$emit('changeDate')"
  >
    <div :class="{'date__item-open':activeDate===date}">{{ date }} Тестов: {{ timeArray.length }}</div>
    <div v-if="activeDate===date">
      <info-test-component
        v-for="time of timeArray" :key="date+time"
        :timestamp="timestamp(time)"
        :uid="activeUserUID"
        @click.stop
      ></info-test-component>
    </div>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";

export default {
  name: "dateListComponent",
  components: {
    InfoTestComponent: defineAsyncComponent(() => import("@/components/infoTestComponent"))
  },
  props: {
    activeUserUID: String,
    activeDate: String,
    date: String,
    timeArray: Array
  },
  methods:{
    timestamp(time) {
      return Date.parse(`${this.activeDate.split(".").reverse().join("-")}T${time}`);
    }
  }
};
</script>

<style scoped lang="scss">
.date {
  text-align: center;
  background-color: #FFDAB9;
  box-shadow: 0 0 10px 5px #e9a66a;
  border-radius: 2rem;
  padding: .5rem 0;
  margin: 1rem;
  cursor: pointer;

  &.open{
    box-shadow: none;
  }

  &__item-open {
    position: sticky;
    top: 0;
    background-color: #FFDAB9;
    margin-bottom: 1rem;
  }
}
</style>