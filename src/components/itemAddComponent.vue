<template>
  <div class="add__wrapper" :class="{'open':isOpen}" @click="toOpen">
    <span v-show="!isOpen">+</span>
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
        <input-item :type="'question'" :value="question" @changes="updateValue"></input-item>
      </label>
      <label>Ответ:
        <input-item :type="'answer'" :value="answer" @changes="updateValue"></input-item>
      </label>
      <div>
        <input type="button" value="Очистить" @click="clear">
        <input type="button" value="Добавить" @click="add">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "itemAddComponent",
  components: {
    inputItem: defineAsyncComponent(() => import("@/components/inputItem.vue"))
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
    ...mapState(["orderDifficult", "isOpen", "isLoading"])
  },
  methods: {
    ...mapActions("settings", ["addItem"]),
    ...mapMutations(["setOpen"]),
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
.add {

  &__wrapper {
    height: 3rem;
    width: 3rem;
    bottom: 0;
    border-radius: 0.5rem;
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    &.open {
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