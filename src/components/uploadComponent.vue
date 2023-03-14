<template>
  <div>
    <label :title="'Перезаписать словарь?'">
      <input type="checkbox" v-model="check">
      <span>Перезаписать?</span>
    </label>
    <button-component
      :value="(isLoading)?'Подождите...':'Загрузить словарь'"
      :title="'Загрузите свой словарь в файле excel'"
      @click="$refs.file.click()"
    ></button-component>
    <input ref="file" type="file" @change="upload" accept=".xls,.xlsx">
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia/dist/pinia";
import { defineAsyncComponent } from "vue";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";
import { authStore } from "@/store/authStore";

export default {
  name: "uploadComponent",
  components: {
    buttonComponent: defineAsyncComponent(() => import("@/components/buttonComponent.vue"))
  },
  data() {
    return {
      check: false
    };
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


input[type="checkbox"] {
  width: 1.5rem;
  height: 1.5rem;

  @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }
}

input[type="file"] {
  display: none;
}
</style>