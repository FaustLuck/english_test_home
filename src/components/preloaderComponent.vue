<template>
  <!--  <div class="container__preloader">-->
  <v-layout class="container__preloader">
    <v-progress-circular indeterminate :size="128" :width="12"></v-progress-circular>
  </v-layout>
  <!--  </div>-->
</template>
<script>
export default {
  name: "preloaderComponent"
};
</script>
<style lang="scss" scoped>
.container__preloader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>