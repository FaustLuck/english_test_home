<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div v-else>
    <div class="time">
      <span>Ограничение по времени: </span>
      <span>{{ min }}</span> : <span>{{ sec }}</span>
    </div>
    <div class="variants">
      <span>Количество вариантов ответов: </span>
      <span>{{ variants }}</span>
    </div>
    <div class="container">
      <test-difficult-component
        v-for="difficult of orderDifficult"
        :key="difficult"
        :difficult="difficult"
        :part-answers="concatDictionary(difficult)"
      ></test-difficult-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";
import { compare } from "@/utils/utils";

export default {
  name: "SettingsView",
  components: {
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent"))
  },
  data() {
    return {
      isLoading: true,
      min: 0,
      sec: 0
    };
  },
  watch: {
    timer(value) {
      if (value) {
        this.timeToString(value);
        this.isLoading = false;
      }
    }
  },
  computed: {
    ...mapState("settings", ["timer", "dictionary", "limits", "variants", "excluded", "included"]),
    ...mapState("auth", ["sub"]),
    ...mapState(["orderDifficult"]),
  },
  methods: {
    ...mapActions("settings", ["getSettings"]),
    timeToString(time) {
      this.sec = (time % 60).toString().padStart(2, "0");
      this.min = (time - this.sec) / 60;
    },
    concatDictionary(difficult) {
      const included = this.included?.[difficult] ? this.included[difficult] : [];
      const excluded = this.excluded?.[difficult] ? this.excluded[difficult] : [];
      const dictionary = this.dictionary[difficult];
      let tmp = dictionary.concat(included).sort(compare);
      return tmp.concat(excluded);
    }
  },
  async mounted() {
    if (!this.timer) {
      await this.getSettings({sub: this.sub});
    } else {
      this.timeToString(this.timer);
      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
}
</style>