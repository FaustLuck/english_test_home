<template>
  <div>
    <button-component
            :value="(isLoading)?'Подождите...':'Загрузить Excel'"
            :title="'Загрузите свой словарь в файле excel'"
            :loading="isLoading"
            @click="$refs.file.click()"
    ></button-component>
    <input ref="file" type="file" @change="upload" accept=".xls,.xlsx">
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia/dist/pinia";
import { defineAsyncComponent } from "vue";
import { useSettingsStore } from "@/store/settings";
import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";

export default {
  name: "uploadComponent",
  components: {
    buttonComponent: defineAsyncComponent(() => import("@/stories/Button.vue"))
  },
  props: {
    check: Boolean
  },
  computed: {
    ...mapState(useLoadingStore, ["isLoading"]),
    ...mapState(useAuthStore, ["sub"])
  },
  methods: {
    ...mapActions(useSettingsStore, ["sendNewDictionary"]),
    ...mapActions(useLoadingStore, ["setLoading"]),
    async upload(e) {
      this.setLoading(true);
      const file = e.target.files[0];
      await this.sendNewDictionary(file, this.check, this.sub);
      e.target.value = "";
      this.setLoading(false);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
}

label {
  cursor: pointer;
  text-align: center;

  & > span {
    margin-left: 1rem;
  }
}

input[type="file"] {
  display: none;
}
</style>