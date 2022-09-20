<template>
  <div class="date"
       :class="{open:activeDate===date}"
       @click="$emit('changeDate')"
  >
    <div
      ref="title"
      :class="{
        'date__item':activeDate===date,
        'top':activeDate===date && isTop
      }"
    >
      {{ date }} Тестов: {{ timeArray.length }}
    </div>
    <div v-if="activeDate===date">
      <test-info-component
        v-for="time of timeArray"
        :key="date+time"
        :date="activeDate"
        :time="time"
        :answers="answers(time)"
        @click.stop
      ></test-info-component>
    </div>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  name: "dateListComponent",
  components: {
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent"))
  },
  props: {
    activeUserUID: String,
    activeDate: String,
    date: String,
    timeArray: Array
  },
  data() {
    return {
      isTop: false
    };
  },
  computed: {
    ...mapGetters("statistic", ["getAnswers"]),
  },
  methods: {
    timestamp(time) {
      return Date.parse(`${this.activeDate.split(".").reverse().join("-")}T${time}`);
    },
    getTop() {
      this.isTop = this.$refs.title.getBoundingClientRect().top === 0;
    },
    answers(time) {
      return this.getAnswers(this.activeUserUID, this.timestamp(time));
    }
  },
  created() {
    window.addEventListener("scroll", this.getTop);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.getTop);
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

  &__item {
    position: sticky;
    top: 0;
    background-color: #FFDAB9;
    margin-bottom: 1rem;

    &.top {
      border-bottom-left-radius: 2rem;
      border-bottom-right-radius: 2rem;
      box-shadow: 0 5px 0 0 #e9a66a;
    }
  }
}
</style>