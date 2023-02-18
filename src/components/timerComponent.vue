<template>
  <span>{{ time }}</span>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "timerComponent",
  data() {
    return {
      timerID: null,
      timeLeft: null
    };
  },
  computed: {
    ...mapState("test", ["timer"]),
    time() {
      let sec = (this.timeLeft % 60).toString().padStart(2, "0");
      let min = (this.timeLeft - sec) / 60;
      return `${min}:${sec}`;
    }
  },
  watch: {
    timerSec(value) {
      if (value === 0) {
        clearInterval(this.timerID);
        document.body.classList.add("fail");
        setTimeout(async () => {
          document.body.classList.remove("fail");
          this.changeTestStatus(false);
          this.$router.push("result");
          this.setLoading(true);
          await this.checkTest();
          this.setLoading(false);
        }, 3000);
      }
    }
  },
  methods: {
    ...mapMutations("test", ["saveTimes", "changeTestStatus", "saveTimerSec"]),
    ...mapMutations(["setLoading"]),
    ...mapActions("test", ["checkTest"])
  },
  created() {
    this.timeLeft = this.timer;
    this.timerID = setInterval(() => {
      this.timeLeft--;
      this.saveTimerSec(this.timeLeft);
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerID);
    this.saveTimes(this.timeLeft);
  }
};
</script>

<style scoped>

</style>