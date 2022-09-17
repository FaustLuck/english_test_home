<template>
  <span>{{ time }}</span>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "timerComponent",
  data() {
    return {
      timerID: null,
      timerSec: null
    };
  },
  computed: {
    ...mapGetters("settings", ["getTimer"]),
    timerStart() {
      if (!this.getTimer) return;
      let {min, sec} = this.getTimer;
      return min * 60 + sec;
    },
    time() {
      let sec = (this.timerSec % 60).toString().padStart(2, "0");
      let min = (this.timerSec - sec) / 60;
      return `${min}:${sec}`;
    }
  },
  methods: {
    ...mapMutations("test", ["saveTimes"]),
  },
  created() {
    this.timerSec = this.timerStart;
    this.timerID = setInterval(() => {
      this.timerSec--;
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerID);
    this.saveTimes(this.timerStart - this.timerSec);
  }
};
</script>

<style scoped>

</style>