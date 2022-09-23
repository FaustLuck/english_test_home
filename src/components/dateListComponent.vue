<template>
  <div class="date"
       :class="{'open':isOpen}"
       @click="toOpen"
  >
    <div ref="title" :class="{'top':isTop,'date__item':isOpen}">
      {{ date }} Тестов: {{ timeArray.length }}
    </div>
    <div v-if="isOpen">
      <keep-alive>
        <test-info-component
          v-for="timeObj of timeArray"
          :key="timeObj.timestamp"
          :date="date"
          :time="timeObj.time"
          :answers="answers(timeObj.timestamp)"
          :height-title="heightTitle"
        ></test-info-component>
      </keep-alive>
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
      isOpen: false,
      heightTitle: 0
    };
  },
  computed: {
    ...mapGetters("statistic", ["getAnswers"]),
    ...mapState(["orderDifficult"]),
  },
  methods: {
    getTop() {
      if (!this.isOpen) return;
      this.isTop = this.$refs.title.getBoundingClientRect().top === 0;
    },
    answers(timestamp) {
      return this.getAnswers(this.activeUserUID, timestamp);
    },
    toOpen(e) {
      if (e.target !== this.$refs.title) return;
      this.isOpen = !this.isOpen;
      (this.isOpen)
        ? window.addEventListener("scroll", this.getTop)
        : window.removeEventListener("scroll", this.getTop);
    },
    calculateHeightTitle() {
      if (!this.$refs.title.classList.contains("date__item")) return;
      let marginBottom = getComputedStyle(this.$refs.title).marginBottom;
      this.heightTitle = this.$refs.title.getBoundingClientRect().height + parseInt(marginBottom);
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.getTop);
  },
  updated() {
    this.calculateHeightTitle();
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
  @media screen and (max-width: 768px) {
    margin: 1rem 0;
  }

  &.open {
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