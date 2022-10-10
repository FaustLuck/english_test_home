<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <span v-else>settings</span>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PreloaderComponent from "@/components/preloaderComponent";

export default {
  name: "SettingsView",
  components: {PreloaderComponent},
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapState("auth", ["isAdmin"]),
    ...mapState("settings", ["settings"])
  },
  watch: {
    settings(value) {
      if (!Object.keys(value).length) return;
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions("settings", ["requestSettings"])
  },
  async created() {
    if (!this.isAdmin) this.$router.replace({name: "test"});
    await this.requestSettings();
  }
};
</script>

<style lang="scss" scoped>

</style>