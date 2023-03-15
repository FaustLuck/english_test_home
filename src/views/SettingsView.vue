<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div class="settings" v-else>
    <div class="settings__row">
      <span>Ограничение по времени: </span>
      <div>
        <input
          data-max="59"
          data-min="0"
          data-type="min"
          type="number"
          v-model.number="min"
          @input="change"> мин
        <input
          data-max="59"
          data-min="1"
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
          data-min="2"
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
          data-min="1"
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
import { mapState, mapActions } from "pinia";
import { authStore } from "@/store/authStore";
import { defineAsyncComponent } from "vue";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";

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
    ...mapState(settingsStore, ["timer", "dictionary", "limits", "variants"]),
    ...mapState(authStore, ["sub"]),
    ...mapState(mainStore, ["orderDifficult", "isLoading"]),
    minVariantCount() {
      let lengths = [];
      for (let difficult in this.dictionary) {
        lengths.push(this.dictionary[difficult].length);
      }
      return Math.min(...lengths);
    }
  },
  methods: {
    ...mapActions(settingsStore, ["getSettings", "saveTimer", "saveVariants", "saveLimits"]),
    ...mapActions(mainStore, ["setLoading"]),
    timeToString() {
      this.sec = (this.timer % 60).toString().padStart(2, "0");
      this.min = (this.timer - this.sec) / 60;
    },
    change(e, difficult) {
      const {max, min, type} = e.target.dataset;
      if (type !== "limits") {
        if (this[type] > parseInt(max)) this[type] = max;
        if (this[type] < parseInt(min)) this[type] = min;
        if (["min", "sec"].includes(type)) {
          const timer = this.min * 60 + +this.sec;
          this.timeToString();
          this.saveTimer(timer);
        }
        if (type === "localVariants") this.saveVariants(this.localVariants);
      } else {
        if (this.localLimits[difficult] > parseInt(max)) this.localLimits[difficult] = max;
        if (this.localLimits[difficult] < parseInt(min)) this.localLimits[difficult] = min;
        this.saveLimits(difficult,this.localLimits[difficult]);
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
      await this.getSettings(this.sub);
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
    align-items: center;

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

input[type="number"] {
  font-size: 2.5rem;
  font-family: "serif";
  background-color: transparent;
  margin: 3px;
  width: 3ch;
  text-align: center;
  border: none;
  outline: 1px solid black;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
}
</style>