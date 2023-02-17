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
      timerSec: null
    };
  },
  computed: {
    ...mapState("test", ["timer"]),
    ...mapState(["isLoading"]),
    time() {
      let sec = (this.timerSec % 60).toString().padStart(2, "0");
      let min = (this.timerSec - sec) / 60;
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
    ...mapMutations("test", ["saveTimes", "saveTimerSec", "changeTestStatus"]),
    ...mapMutations(["setLoading"]),
    ...mapActions("test", ["checkTest"])
  },
  created() {
    this.timerSec = this.timer;
    this.timerID = setInterval(() => {
      this.timerSec--;
      this.saveTimerSec(this.timerSec);
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timerID);
    this.saveTimes(this.timer - this.timerSec);
  }
};
</script>

<style scoped>

</style>