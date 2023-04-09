<template>
  <v-chip>{{ time }}</v-chip>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useTestStore } from "@/store/test";

export default {
  name: "timerComponent",
  computed: {
    ...mapState(useTestStore, ["timer", "timeLeft", "timerID"]),
    time() {
      let sec = (this.timeLeft % 60).toString().padStart(2, "0");
      let min = (this.timeLeft - sec) / 60;
      return `${min}:${sec}`;
    }
  },
  watch: {
    timeLeft(value) {
      if (value === 0 && this.timerID > 0) {
        this.clearTimerID();
        document.body.classList.add("fail");
        setTimeout(async () => {
          document.body.classList.remove("fail");
          this.$router.push("result");
          this.changeTestStatus(false);
        }, 3000);
      }
    }
  },
  methods: {
    ...mapActions(useTestStore, ["saveTimes", "changeTestStatus", "saveTimerSec", "clearTimerID", "setTimerID"]),
    decreaseTime() {
      this.saveTimerSec(this.timeLeft - 1);
    }
  },
  created() {
    this.saveTimerSec(this.timer);
    const timerID = setInterval(this.decreaseTime, 1000);
    this.setTimerID(timerID);
  },
  beforeUnmount() {
    if (!this.timerID) return;
    this.clearTimerID();
    this.saveTimes();
  }
};
</script>

<style scoped>

</style>