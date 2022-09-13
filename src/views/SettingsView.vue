<template>
  <span>{{title}}</span>
</template>

<script>
import { useRoute } from "vue-router/dist/vue-router";

export default {
  name: "SettingsView",
  computed: {
    title() {
      return useRoute().name;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>