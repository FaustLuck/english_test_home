<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { mapState } from "pinia";
import { failShow } from "@/utils/failShow";
import { fireShow } from "@/utils/fireShow";
import { mainStore } from "@/store";

export default {
  name: "AnimationShow",
  computed: {
    ...mapState(mainStore, ["mode", "isAnimate"]),
  },
  watch: {
    isAnimate(status) {
      if (!status) this.$router.replace({name: "test"});
    }
  },

  async mounted() {
    switch (this.mode) {
      case "fire-show":
        await fireShow(this.$refs.canvas);
        break;
      case "fail-show":
        failShow(this.$refs.canvas);
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>