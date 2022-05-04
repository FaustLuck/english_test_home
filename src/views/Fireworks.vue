<template>
  <canvas ref="canvas"></canvas>
</template>
<script>
import fireShow from "@/utils";
export default {
  name: "FireworksPage",
  mounted() {
    let canvas = this.$refs.canvas;
    fireShow(canvas);
  },
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