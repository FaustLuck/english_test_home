<template>
  <div class="layout transition"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "layoutComponent",
  data() {
    return {
      colorWarning: {
        r: 255,
        g: 140,
        b: 105
      },
      isColored: null,
      timeWarning: 30,
      timeAlert: 10,
      deltaGreen: 0,
      deltaBlue: 0,
      duration: 0,
      intervalChangeFlagID: null,
    };
  },
  computed: {
    ...mapState("test", ["timeLeft"]),
    mode() {
      return this.$route.name;
    }
  },
  watch: {
    timeLeft(value) {
      if (value > this.timeAlert && value <= this.timeWarning) {
        if (this.isColored === null) {
          this.isColored = true;
          this.intervalChangeFlagID = setInterval(this.changeFlag, this.duration * 1000 - 100);
        }
        this.colorWarning.g -= this.deltaGreen;
        this.colorWarning.b -= this.deltaBlue;
        this.setColor();
      }
      if (value > 0 && value <= this.timeAlert) {
        clearInterval(this.intervalChangeFlagID);
        this.$el.style = "";
        this.$el.classList.add("alert");
      }
      if (value === 0) {
        this.$el.classList.remove("alert");
        this.$el.style.backgroundColor = "transparent";
      }
    },
    mode(newVal, oldVal) {
      if (oldVal === "test" && newVal === "result") {
        this.$el.classList.remove('transition')
        this.$el.style = "";
      }
    }
  },
  methods: {
    setColor() {
      let {r, g, b} = this.colorWarning;
      this.$el.style.backgroundColor = (this.isColored) ? "rgb(255,218,185)" : `rgb(${r}, ${g}, ${b})`;
    },
    changeFlag() {
      this.isColored = !this.isColored;
    }
  },
  mounted() {
    this.duration = +window.getComputedStyle(this.$el).transitionDuration.replace("s", "");
    this.deltaGreen = Math.round((this.colorWarning.g) / (this.timeWarning - this.timeAlert));
    this.deltaBlue = Math.round((this.colorWarning.b) / (this.timeWarning - this.timeAlert));
  }
};
</script>

<style lang="scss" scoped>
.layout {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #FFDAB9;
  z-index: -1;

  &.transition{
    transition: background-color 2s linear;
  }

  &.alert {
    animation: flash 1s linear infinite;
  }
}

//todo переработать

@keyframes flash {
  from {
    background-color: red;
  }
  49.9% {
    background-color: red;
  }
  50% {
    background-color: #FFDAB9;
  }
  to {
    background-color: #FFDAB9;
  }
}
</style>