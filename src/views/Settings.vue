<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <form v-else>
    <div class="settings">
      <div class="settings__detail">
        <span>Ограничение по времени:</span>
        <span class="time">
          <input type="number" v-model.number="settings.timer.min" />
          :
          <input type="number" v-model.number="settings.timer.sec" />
        </span>
      </div>
      <div class="settings__detail">
        <span>Количество вариантов:</span>
        <span>
          <input type="number" v-model.number="settings.variants" />
        </span>
      </div>
      <div v-for="(count, difficult) of settings.tests" :key="difficult">
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
              v-if="activeIndex == difficult"
              :index="'newValue'"
              :item="{}"
              :editable="true"
              @editRecord="editRecord"
            ></card-item>
          </keep-alive>
        </div>
        <keep-alive v-if="activeIndex === difficult">
          <card-item
            v-for="item of settings.dictionary[difficult]"
            :key="item.question"
            :item="item"
            :index="item.question"
            :editable="true"
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
  </form>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
export default {
  name: "SettingsPage",
  components: {
    CardItem,
  },
  data() {
    return {
      settings: {},
      loading: true,
      path: "settings",
      activeIndex: "",
    };
  },
  methods: {
    checkCount(value, difficult) {
      let max = this.settings.dictionary[difficult].length;
      if (value > max) this.settings.tests[difficult] = max;
    },
    saveData() {
      this.$store.dispatch("setData", { path: this.path, data: this.settings });
    },
    deleteRecord(item) {
      this.settings.dictionary[this.activeIndex] = this.settings.dictionary[
        this.activeIndex
      ].filter((el) => el.question != item.question);
    },
    editRecord(item) {
      let dictionary = this.settings.dictionary[this.activeIndex];
      let param = item.index == "newValue" ? item.question : item.index;
      let index = dictionary.findIndex((el) => el.question == param);
      if (item.index == "newValue") {
        if (index > -1) return;
        let newItem = {
          question: item.question,
          answer: item.answer,
        };
        dictionary.push(newItem);
      } else {
        dictionary[index].question = item.question;
        dictionary[index].answer = item.answer;
      }
    },
  },
  async mounted() {
    let settingsStore = this.$store.getters.getInfo(this.path);
    this.settings = Object.keys(settingsStore).length
      ? settingsStore
      : await this.$store.dispatch("fetchData", { path: this.path });
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.settings {
  cursor: default;

  &__detail {
    border: 1px solid black;
    margin: -1px;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;

    & > span {
      padding: 0 1rem;
    }
  }

  .difficult {
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: peachpuff;
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

    &[type="number"] {
      width: 60px;
      cursor: default;

      &::-webkit-inner-spin-button {
        display: none;
      }
    }
    &[type="button"] {
      padding: 0.5rem 1rem;
      margin: 0 auto;
      font-size: 1.5rem;
      position: sticky;
      bottom: 0;
    }
  }
}
</style>