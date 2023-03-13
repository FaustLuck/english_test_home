<template>
  <div class="add__wrapper" :class="{'open':isOpen}" @click="toOpen">
    <button-component
      v-show="!isOpen"
      :value="'+'"
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
          @click="clear"
        ></button-component>
        <button-component
          :value="'Добавить'"
          :title="'Добавить'"
          @click="add"
        ></button-component>
      </div>
      <div>
        <upload-component></upload-component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { defineAsyncComponent } from "vue";
import { settingsStore } from "@/store/settingsStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "itemAddComponent",
  components: {
    uploadComponent: defineAsyncComponent(() => import("@/components/uploadComponent.vue")),
    inputComponent: defineAsyncComponent(() => import("@/components/inputComponent.vue")),
    buttonComponent: defineAsyncComponent(() => import("@/components/buttonComponent.vue"))
  },
  data() {
    return {
      question: "",
      answer: "",
      selectedDifficult: ""
    };
  },
  watch: {
    isOpen(flag) {
      this.setOpen(flag);
    }
  },
  computed: {
    ...mapState(mainStore, ["orderDifficult", "isOpen", "isLoading"])
  },
  methods: {
    ...mapActions(settingsStore, ["addItem"]),
    ...mapActions(mainStore, ["setOpen"]),
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
      this.addItem({
        difficult: this.selectedDifficult,
        item
      });
      this.clear();
    },
    toOpen() {
      if (!this.isLoading) this.setOpen(true);
    }
  },
  created() {
    this.selectedDifficult = this.orderDifficult[0];
  }
};
</script>

<style lang="scss" scoped>
select {
  font-size: 2.5rem;
  font-family: "serif";
  width: 50%;
  background-color: transparent;
  border: none;
  outline: 1px solid black;
  margin: 3px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  & > option {
    font-size: 2.5rem;
    font-family: "serif";
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;
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
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;

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

      & > input[type="button"] {
        min-width: 25%;
      }
    }
  }
}
</style>