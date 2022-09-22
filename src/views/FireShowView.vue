<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { mapState } from "vuex";
import { fireShow } from "@/utils";

export default {
  name: "FireShowView",
  computed: {
    ...mapState("test", ["answers"]),

  },
  mounted() {
    fireShow(this.$refs.canvas);
  },
  created() {
    if (!this.answers) return this.$router.replace({name: "test"});
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