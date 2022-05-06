<template>
  <canvas ref="canvas"></canvas>
</template>
<script>
import fireshow from "@/utils/fireshow";
export default {
  name: "FireshowPage",
  mounted() {
    let canvas = this.$refs.canvas;
    fireshow(canvas);
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