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
    <div v-for="difficult of order" :key="difficult">
      <div class="difficult">
        <div
          class="settings__detail"
          @click="activeIndex = difficult"
          v-if="settings.dictionary[difficult].length"
        >
          <span>Количество вопросов {{ difficult }}</span>
          <span>
            <input
              type="number"
              @click.stop
              v-model.number="settings.tests[difficult]"
              @input="checkCount($event.target.value, difficult)"
            />
          </span>
        </div>
        <keep-alive>
          <card-item
            v-if="activeIndex === difficult"
            :index="'newValue'"
            :item="{}"
            :mode="'settings'"
            @editRecord="editRecord"
          ></card-item>
        </keep-alive>
      </div>
      <keep-alive v-if="activeIndex === difficult">
        <card-item
          v-for="(item, index) of settings.dictionary[difficult]"
          :key="item.question"
          :item="item"
          :index="index"
          :mode="'settings'"
          @deleteRecord="deleteRecord(item)"
          @editRecord="editRecord"
        >
        </card-item>
      </keep-alive>
    </div>
    <div class="settings__detail update">
      <input type="button" value="Обновить настройки" @click="saveData" />
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import { mapState } from "vuex";
import { compare } from "@/utils";
import LoaderSpinner from "@/components/LoaderSpinner";
export default {
  name: "SettingsPage",
  components: {
    LoaderSpinner,
    CardItem,
  },
  data() {
    return {
      loading: true,
      activeIndex: "",
    };
  },
  computed: mapState(["settings", "order"]),
  watch: {
    settings: function (value) {
      if (!value) return;
      this.loading = false;
    },
  },
  methods: {
    checkCount(value, difficult) {
      let max = this.settings.dictionary[difficult].length;
      if (value > max) this.settings.tests[difficult] = max;
    },
    checkTime(value) {
      if (value > 59) this.settings.timer.sec = 59;
    },
    saveData() {
      this.sortDictionary(this.settings.dictionary);
      this.$store.dispatch("setSettings", this.settings);
    },
    deleteRecord(item) {
      this.settings.dictionary[this.activeIndex] = this.settings.dictionary[
        this.activeIndex
      ].filter((el) => el.question !== item.question);
    },
    editRecord(item) {
      let dictionary = this.settings.dictionary[this.activeIndex];
      let param = item.index === "newValue" ? item.question : item.index;
      let index = dictionary.findIndex((el) => el.question === param);
      item.answers = item.answers[0];
      if (item.index === "newValue") {
        if (index > -1) return;
        let newItem = {
          question: item.question,
          answer: item.answers,
        };
        dictionary.push(newItem);
      } else {
        dictionary[item.index].question = item.question;
        dictionary[item.index].answer = item.answers;
      }
    },
    sortDictionary(dictionary) {
      for (let difficult in dictionary) {
        let dictionaryOfDifficult = dictionary[difficult];
        dictionaryOfDifficult.sort(compare);
      }
    },
  },
  async created() {
    await this.$store.dispatch("getSettings");
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