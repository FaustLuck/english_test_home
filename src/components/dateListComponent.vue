<template>
  <div class="date"
       :class="{'open':isOpen}"
       @click="toOpen"
  >
    <div ref="title" :class="{'top':isTop,'date__item':isOpen}">
      {{ date }} Тестов: {{ timeArray.length }}
    </div>
    <div v-show="isOpen">
      <test-info-component
        v-for="time of timeArray"
        :key="date+time"
        :date="date"
        :time="time"
        :answers="answers(time)"
      ></test-info-component>
    </div>
  </div>
</template>

<script>

import { defineAsyncComponent } from "vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "dateListComponent",
  components: {
    testInfoComponent: defineAsyncComponent(() => import("@/components/testInfoComponent")),
  },
  props: {
    activeUserUID: String,
    date: String,
    timeArray: Array
  },
  data() {
    return {
      isTop: false,
      isOpen: false
    };
  },
  computed: {
    ...mapGetters("statistic", ["getAnswers"]),
    ...mapState(["orderDifficult"])
  },
  methods: {
    timestamp(time) {
      return Date.parse(`${this.date.split(".").reverse().join("-")}T${time}`);
    },
    getTop() {
      if (!this.isOpen) return;
      this.isTop = this.$refs.title.getBoundingClientRect().top === 0;
    },
    answers(time) {
      return this.getAnswers(this.activeUserUID, this.timestamp(time));
    },
    toOpen(e) {
      if (e.target === this.$refs.title) this.isOpen = !this.isOpen;
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
      z-index: 1;
    }
  }
}
</style>