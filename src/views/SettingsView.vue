<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div class="settings" v-else>
    <div class="settings__row">
      <span>Ограничение по времени: </span>
      <div>
        <input
          data-max="59"
          data-type="min"
          type="number"
          v-model.number="min"
          @input="change"> мин
        <input
          data-max="59"
          data-type="sec"
          type="number"
          v-model.number="sec"
          @input="change"> сек
      </div>
    </div>
    <div class="settings__row">
      <span>Количество вариантов ответов: </span>
      <div>
        <input
          :data-max="minVariantCount"
          data-type="localVariants"
          type="number"
          v-model.number="localVariants"
          @input="change">
      </div>
    </div>
    <div
      class="settings__row"
      v-for="difficult of orderDifficult"
      :key="'limit'+difficult"
    >
      <span>Количество вопросов {{ difficult }}: </span>
      <div>
        <input
          :data-max="dictionary[difficult].length"
          data-type="limits"
          type="number"
          v-model.number="localLimits[difficult]"
          @input="(e)=>change(e,difficult)">
      </div>
    </div>
    <div class="container">
      <test-difficult-component
        v-for="difficult of orderDifficult"
        :key="difficult"
        :difficult="difficult"
        :part-answers="dictionary[difficult]"
      ></test-difficult-component>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { mapState as piniaMapSate } from "pinia";
import { useAuthStore } from "@/store/auth";
import { defineAsyncComponent } from "vue";

export default {
  name: "SettingsView",
  components: {
    testDifficultComponent: defineAsyncComponent(() => import("@/components/testDifficultComponent.vue")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue"))
  },
  data() {
    return {
      min: 0,
      sec: 0,
      localVariants: 0,
      localLimits: {}
    };
  },
  watch: {
    timer(value) {
      if (value) {
        this.setSettingsToLocal();
      }
    }
  },
  computed: {
    ...mapState("settings", ["timer", "dictionary", "limits", "variants"]),
    ...piniaMapSate(useAuthStore, ["sub"]),
    ...mapState(["orderDifficult", "isLoading"]),
    minVariantCount() {
      let lengths = [];
      for (let difficult in this.dictionary) {
        lengths.push(this.dictionary[difficult].length);
      }
      return Math.min(...lengths);
    }
  },
  methods: {
    ...mapActions("settings", ["getSettings", "saveTimer", "saveVariants", "saveLimits"]),
    ...mapMutations(["setLoading"]),
    timeToString() {
      this.sec = (this.timer % 60).toString().padStart(2, "0");
      this.min = (this.timer - this.sec) / 60;
    },
    change(e, difficult) {
      const {max, type} = e.target.dataset;
      if (type !== "limits") {
        if (this[type] > parseInt(max)) this[type] = max;
        if (["min", "sec"].includes(type)) {
          const timer = this.min * 60 + +this.sec;
          this.timeToString();
          this.saveTimer({timer});
        }
        if (type === "localVariants") this.saveVariants({variants: this.localVariants});
      } else {
        if (this.localLimits[difficult] > parseInt(max)) this.localLimits[difficult] = max;
        this.saveLimits({difficult, limit: this.localLimits[difficult]});
      }
      e.target.style.backgroundColor = "#dddd5d";
    },
    setSettingsToLocal() {
      this.timeToString();
      this.localVariants = this.variants;
      this.localLimits = this.limits;
      this.setLoading(false);
    }
  },
  async mounted() {
    if (!this.timer) {
      await this.getSettings({sub: this.sub});
    } else {
      this.setSettingsToLocal();
    }
  }
};
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
  width: 100%;
  max-width: inherit;
  margin-top: 1rem;

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }

  &__row {
    display: flex;
    justify-content: space-between;

    & > * {
      width: 50%;
    }

  }


  & > .container {
    display: flex;
    flex-direction: column;
  }

  & > footer {
    position: fixed;
    bottom: 0;
    width: inherit;
    max-width: inherit;
    height: 2rem;
    background-color: #FFDAB9;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    box-shadow: 0 -5px 0 0 #e9a66a;
  }
}
</style>