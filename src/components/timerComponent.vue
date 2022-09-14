<template>
  <span v-if="timerID">{{ time }}</span>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

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
    ...mapState("test", ["isTesting"]),
    timerStart() {
      let {min, sec} = this.getTimer;
      return min * 60 + sec;
    },
    time() {
      let sec = (this.timerSec % 60).toString().padStart(2, "0");
      let min = (this.timerSec - sec) / 60;
      return `${min}:${sec}`;
    }
  },
  watch: {
    isTesting(value) {
      (value) ? this.start() : this.cancel();
    }
  },
  methods: {
    ...mapMutations("test", ["saveTimeSpent"]),
    start() {
      this.timerSec = this.timerStart;
      this.timerID = setInterval(() => {
        this.timerSec--;
      }, 1000);
    },
    cancel() {
      clearInterval(this.timerID);
      this.saveTimeSpent(this.timerStart - this.timerSec);
    }
  }
};
</script>

<style scoped>

</style>