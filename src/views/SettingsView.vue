<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <div class="settings" v-else>
    <div class="settings__row">
      <span>Ограничение по времени: </span>
      <div>
        <input
          data-type="min"
          type="number"
          v-model.number="min"
          @input="changeTimer"> мин
        <input
          data-type="sec"
          type="number"
          v-model.number="sec"
          @input="changeTimer"> сек
      </div>
    </div>
    <div class="settings__row">
      <span>Количество вариантов ответов: </span>
      <div>
        <input
          type="number"
          v-model.number="localVariants"
          @input="saveVariants(localVariants)">
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
          type="number"
          v-model.number="localLimits[difficult]"
          @input="(e)=>changeLimit(e,difficult)">
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
      if (value) this.setSettingsToLocal();
    }
  },
  computed: {
    ...mapState(settingsStore, ["timer", "dictionary", "limits", "variants"]),
    ...mapState(authStore, ["sub"]),
    ...mapState(mainStore, ["orderDifficult", "isLoading"]),
  },
  methods: {
    ...mapActions(settingsStore, ["getSettings", "saveTimer", "saveVariants", "saveLimits"]),
    ...mapActions(mainStore, ["setLoading"]),
    changeTimer(e) {
      const {type} = e.target.dataset;
      this[type] = this[type].toString();
      this[type] = this[type].replace(/^0+|\D/g, "");
      this[type] = (this[type] > 59) ? 59 : parseInt(this[type]) || 0;
      this.saveTimer(parseInt(this.min) * 60 + parseInt(this.sec));
      e.target.style.backgroundColor = "#dddd5d";
    },
    changeLimit(e, difficult) {
      this.saveLimits(difficult, this.localLimits[difficult]);
      e.target.style.backgroundColor = "#dddd5d";
    },
    setSettingsToLocal() {
      this.sec = (this.timer % 60).toString().padStart(2, "0");
      this.min = (this.timer - this.sec) / 60;
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
  @media screen and (max-width: 576px) {
    font-size: 1rem;
  }
}
</style>