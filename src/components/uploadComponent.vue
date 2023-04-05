<template>
  <div>
    <button-component
      :value="(isLoading)?'Подождите...':'Загрузить Excel'"
      :title="'Загрузите свой словарь в файле excel'"
      @click="$refs.file.click()"
    ></button-component>
    <input ref="file" type="file" @change="upload" accept=".xls,.xlsx">
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia/dist/pinia";
import { defineAsyncComponent } from "vue";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";
import { authStore } from "@/store/authStore";

export default {
  name: "uploadComponent",
  components: {
    buttonComponent: defineAsyncComponent(() => import("@/stories/Button.vue"))
  },
  props: {
    check: Boolean
  },
  computed: {
    ...mapState(mainStore, ["isLoading"]),
    ...mapState(authStore, ["sub"])
  },
  methods: {
    ...mapActions(settingsStore, ["sendNewDictionary"]),
    ...mapActions(mainStore, ["setLoading"]),
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