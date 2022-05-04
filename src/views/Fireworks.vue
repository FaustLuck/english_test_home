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
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>