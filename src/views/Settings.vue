<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div v-else class="settings">
    <div class="settings__detail">
      <span>Ограничение по времени:</span>
      <span class="time">
        <input type="number" v-model.number="settings.timer.min" />
        :
        <input
          type="number"
          v-model.number="settings.timer.sec"
          @input="checkTime($event.target.value)"
        />
      </span>
    </div>
    <div class="settings__detail">
      <span>Количество вариантов:</span>
      <span>
        <input type="number" v-model.number="settings.variants" />
      </span>
    </div>
    <keep-alive>
      <difficult-list
        :questions="settings.dictionary"
        :limits="settings.limits"
      >
      </difficult-list>
    </keep-alive>
    <div class="settings__detail update">
      <input type="button" value="Сохранить настройки" @click="saveData" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DifficultList from "@/components/DifficultList";

export default {
  name: "SettingsPage",
  components: {
    DifficultList,
  },
  data() {
    return {
      loading: true,
      activeIndex: "",
    };
  },
  computed: {
    ...mapState("settings", ["settings"]),
  },
  watch: {
    settings: function (value) {
      if (!value) return;
      this.loading = false;
    },
  },
  methods: {
    checkCount(value, difficult) {
      let max = this.settings.dictionary[difficult].length;
      if (value > max) this.settings.limits[difficult] = max;
    },
    checkTime(value) {
      if (value > 59) this.settings.timer.sec = 59;
    },
    saveData() {
      this.$store.dispatch("settings/setSettings", this.settings);
    },
  },
  async created() {
    await this.$store.dispatch("settings/getSettings");
  },
};
</script>

<style lang="scss" scoped>
.settings {
  cursor: default;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  &__detail {
    border: 1px solid black;
    margin: -1px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }

    & > span {
      padding: 0 1rem;
    }
  }

  .difficult {
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: peachpuff;
    @media screen and (max-width: 768px) {
      top: 4rem;
    }
  }

  .update {
    position: sticky;
    z-index: 1;
    bottom: 0;
    background-color: peachpuff;
  }

  input {
    outline: none;
    font-size: 40px;
    text-align: center;
    font-family: "serif";

    &[type="number"] {
      width: 60px;
      cursor: default;

      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
      }

      &::-webkit-inner-spin-button {
        display: none;
      }
    }

    &[type="button"] {
      padding: 0.5rem 1rem;
      margin: 0 auto;
      font-size: 2rem;
      position: sticky;
      bottom: 0;
      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
}
</style>