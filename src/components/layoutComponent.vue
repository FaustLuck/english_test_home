<template>
  <div class="layout"
       :class="{
    alert:timeLeft>0 && timeLeft<=timeAlert && mode==='test',
    transparent:mode==='settings',
    open:isOpen
  }"
       @click="setOpen(false)"
  ></div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useTestStore } from "@/store/test";
import { useCommonStore } from "@/store/common.js";

export default {
  name: "layoutComponent",
  data() {
    return {
      isColored: null,
      timeWarning: 30,
      timeAlert: 10,
      animationStart: null,
      animationID: 0,
      colorDefault: {r: 255, g: 218, b: 185},
      colorWarning: {r: 255, g: 140, b: 105},
      colorAlert: {r: 255, g: 0, b: 0},
      colorDelta: {},
      color: {},
      durationStep: 4000,
    };
  },
  computed: {
    ...mapState(useTestStore, ["timeLeft"]),
    ...mapState(useCommonStore, ["mode", "isOpen"])
  },
  watch: {
    timeLeft(value) {
      if (value > this.timeAlert && value <= this.timeWarning) {
        if (value === 18) this.durationStep = 2000;
        this.colorWarning = this.addDelta(this.colorWarning, this.colorDelta);
        if (this.isColored === null) this.isColored = false;
      }
      if (value > 0 && value <= this.timeAlert) {
        cancelAnimationFrame(this.animationID);
        this.$el.style = "";
      }
      if (value === 0) this.$el.style.backgroundColor = "transparent";
    },
    mode(newVal, oldVal) {
      if (oldVal === "test" && newVal === "result") {
        this.$el.style = "";
      }
    },
    isColored() {
      cancelAnimationFrame(this.animationID);
      this.animationStart = null;
      if (this.timeLeft <= this.timeAlert) return;
      if (!this.isColored) this.color = {...this.colorWarning};
      this.animationID = requestAnimationFrame(this.animate);
    }
  },
  methods: {
    ...mapActions(useCommonStore, ["setOpen"]),
    changeColor() {
      this.isColored = !this.isColored;
    },
    animate() {
      if (!this.animationStart) this.animationStart = performance.now();
      let progress = (performance.now() - this.animationStart) / this.durationStep;
      if (progress > 1) progress = 1;
      let color = (this.isColored) ? this.calculateColor(this.colorDefault, this.color, progress) : this.calculateColor(this.color, this.colorDefault, progress);
      this.draw(color);
      if (progress < 1) requestAnimationFrame(this.animate);
      if (progress === 1) this.changeColor();
    },
    draw({r, g, b}) {
      this.$el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    },
    calculateColor(cancelColor, beginColor, progress) {
      let output = {};
      for (let key in cancelColor) {
        output[key] = beginColor[key] + (cancelColor[key] - beginColor[key]) * progress;
      }
      return output;
    },
    addDelta(color, delta) {
      let output = {};
      for (let key in color) {
        output[key] = color[key] + delta[key];
      }
      return output;
    }
  },
  created() {
    let deltaTime = (this.timeWarning - this.timeAlert);
    for (let key in this.colorAlert) {
      this.colorDelta[key] = (this.colorAlert[key] - this.colorWarning[key]) / deltaTime;
    }
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

  &.alert {
    animation: flash 1s linear infinite;
  }

  &.transparent {
    opacity: 0;
    transition: opacity .25s linear;
  }

  &.open {
    z-index: 10;
    opacity: .7;
    background-color: grey;
  }
}

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