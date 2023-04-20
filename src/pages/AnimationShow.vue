<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";
import { failShow } from "@/utils/failShow";
import { fireShow } from "@/utils/fireShow";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ nameShow: string }>();
const router = useRouter();
const { isAnimate } = storeToRefs(useCommonStore());
const canvas = ref(null);

watch(isAnimate, (status) => {
  if (!status) router.replace({ name: "test" });
});

onMounted(() => {
  if (!canvas.value) return;
  switch (props.nameShow) {
    case "fire":
      fireShow(canvas.value);
      break;
    case "fail":
      failShow(canvas.value);
      break;
  }
});
</script>

<style lang="scss" scoped>
canvas {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
}
</style>