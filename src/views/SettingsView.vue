<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <span v-else>settings</span>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "SettingsView",
  components: {
    preloaderComponent:defineAsyncComponent(()=>import("@/components/preloaderComponent"))
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapState("auth", ["isAdmin"]),
    ...mapState("settings", ["settings"])
  },
  methods: {
    ...mapActions("settings", ["requestSettings"])
  },
  async created() {
    this.isLoading = !(await this.requestSettings());
  }
};
</script>

<style lang="scss" scoped>

</style>