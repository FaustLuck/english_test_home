<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { mapState } from "vuex";
import { failShow } from "@/utils/failShow";
import { fireShow } from "@/utils/fireShow";

export default {
  name: "AnimationShow",
  computed: {
    ...mapState("test", ["answers"]),
    mode() {
      return this.$route.name;
    },
  },
  mounted() {
    switch (this.mode) {
      case "fire-show":
        fireShow(this.$refs.canvas);
        break;
      case "fail-show":
        failShow(this.$refs.canvas);
        break;
    }
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