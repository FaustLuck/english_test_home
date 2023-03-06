<template>
  <span>{{ time }}</span>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "timerComponent",
  data() {
    return {
      timerID: null
    };
  },
  computed: {
    ...mapState("test", ["timer", "timeLeft"]),
    time() {
      let sec = (this.timeLeft % 60).toString().padStart(2, "0");
      let min = (this.timeLeft - sec) / 60;
      return `${min}:${sec}`;
    }
  },
  watch: {
    timeLeft(value) {
      if (value === 0) {
        clearInterval(this.timerID);
        document.body.classList.add("fail");
        setTimeout(async () => {
          document.body.classList.remove("fail");
          this.changeTestStatus(false);
          this.$router.push("result");
        }, 3000);
      }
    }
  },
  methods: {
    ...mapMutations("test", ["saveTimes", "changeTestStatus", "saveTimerSec"]),
    decreaseTime() {
      this.saveTimerSec(this.timeLeft-1);
    }
  },
  created() {
    this.saveTimerSec(this.timer);
    this.timerID = setInterval(this.decreaseTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerID);
    this.saveTimes();
  }
};
</script>

<style scoped>

</style>