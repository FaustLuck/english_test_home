<template>
  <span>{{title}}</span>
</template>

<script>
import { mapState } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "SettingsView",
  computed: {
    ...mapState("auth", ["isAdmin"]),
    title() {
      return useRoute().name;
    }
  },
  created() {
    if (!this.isAdmin) useRouter.replace({name: "test"});
  }
};
</script>

<style lang="scss" scoped>

</style>