<template>
  <div class="add__wrapper" :class="{'open':isOpen}" @click="toOpen">
    <button-component
            v-show="!isOpen"
            :value="'+'"
            :loading="isLoading"
            :title="'Добавить новую запись'"
    ></button-component>
    <div v-show="isOpen" class="add__container">
      <label>Сложность:
        <select v-model="selectedDifficult">
          <option
                  v-for="difficult of orderDifficult"
                  :key="difficult"
                  @change="selectedDifficult=difficult"
          >{{ difficult }}
          </option>
        </select>
      </label>
      <label>Вопрос:
        <input-component :type="'question'" :value="question" @changes="updateValue"></input-component>
      </label>
      <label>Ответ:
        <input-component :type="'answer'" :value="answer" @changes="updateValue"></input-component>
      </label>
      <div>
        <button-component
                :value="'Очистить'"
                :title="'Очистить'"
                :loading="isLoading"
                @click="clear"
        ></button-component>
        <button-component
                :value="'Добавить'"
                :title="'Добавить'"
                :loading="isLoading"
                @click="add"
        ></button-component>
      </div>
      <div>
        <upload-component :check="check"></upload-component>
        <span>или</span>
        <button-component
                :value="'Вставить из буфера'"
                :title="'Вставить словарь из буфера обмена'"
                :loading="isLoading"
                @click="addFromClipboard"
        ></button-component>
      </div>
      <div>
        <label :title="'Перезаписать стандартный словарь?'">
          <input type="checkbox" v-model="check">
          <span>Перезаписать стандартный словарь?</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { defineAsyncComponent } from "vue";
import { useSettingsStore } from "@/store/settings.ts";
import { mainStore } from "@/store/mainStore";
import { useAuthStore } from "@/store/auth.js";

export default {
  name: "itemAddComponent",
  components: {
    uploadComponent: defineAsyncComponent(() => import("@/components/uploadComponent.vue")),
    inputComponent: defineAsyncComponent(() => import("@/components/inputComponent.vue")),
    buttonComponent: defineAsyncComponent(() => import("@/stories/Button.vue"))
  },
  data() {
    return {
      question: "",
      answer: "",
      selectedDifficult: "",
      check: false
    };
  },
  watch: {
    isOpen(flag) {
      this.setOpen(flag);
    }
  },
  computed: {
    ...mapState(mainStore, ["orderDifficult", "isOpen", "isLoading"]),
    ...mapState(useAuthStore, ["sub"])
  },
  methods: {
    ...mapActions(useSettingsStore, ["addItem", "sendNewDictionaryFromClipboard"]),
    ...mapActions(mainStore, ["setOpen", "setLoading"]),
    clear() {
      this.question = "";
      this.answer = "";
      this.selectedDifficult = "easy";
    },
    updateValue({type, newValue}) {
      this[type] = newValue;
    },
    add() {
      if (this.question === "" || this.answer === "") return;
      const item = {
        question: this.question,
        answer: this.answer
      };
      this.addItem(this.selectedDifficult, item);
      this.clear();
    },
    toOpen() {
      if (!this.isLoading) this.setOpen(true);
    },
    async addFromClipboard() {
      const text = await navigator.clipboard.readText();
      let table = text.split(/\r\n|\r|\n/g);
      table = table.map(el => el.split("\t"));
      let flag = table.every(this.checkRow);
      if (flag) {
        this.setLoading(true);
        await this.sendNewDictionaryFromClipboard(table, this.check, this.sub);
        this.setLoading(false);
      }

    },
    checkRow(row) {
      row[2] = row[2].toLowerCase();
      return row.length === 3 && row[2].match(/easy|medium|hard/);
    },
  },
  created() {
    this.selectedDifficult = this.orderDifficult[0];
  }
};
</script>

<style lang="scss" scoped>
select {
  font-size: 1em;
  font-family: "serif";
  width: 50%;
  background-color: transparent;
  border: none;
  outline: 1px solid black;
  margin: 3px;

  & > option {
    font-size: 2.5rem;
    font-family: "serif";
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;

    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media screen and (max-width: 576px) {
      font-size: 1rem;
    }
  }
}

.add {

  &__wrapper {
    height: 3rem;
    width: 3rem;
    bottom: 0;
    border-radius: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    &.open {
      background-color: #FFDAB9;
      box-shadow: 0 0 10px 5px #e9a66a;
      position: fixed;
      width: 50%;
      height: 50%;
      cursor: default;
      bottom: 25%;
      left: 25%;
      padding: .5rem;

      @media screen and (max-width: 1200px) {
        width: 100%;
        left: 0;
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 768px) {
      width: 80%;
    }

    & > label {
      width: 100%;
      display: flex;
      justify-content: space-between;

      & > input[type="text"] {
        margin: 3px;
      }
    }

    & > div {
      width: 100%;
      margin: 1rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      @media screen and (max-width: 768px) {
        margin: .25rem;
      }

      & > input[type="button"] {
        min-width: 25%;
      }
    }
  }
}

input[type="checkbox"] {
  width: 1.5rem;
  height: 1.5rem;

  @media screen and (max-width: 768px) {
    width: 1rem;
    height: 1rem;
  }

  @media screen and (max-width: 576px) {
    width: .75rem;
    height: .75rem;
  }
}
</style>