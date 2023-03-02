<template>
  <div class="add__layout" :class="{show:isOpen}" @click="isOpen=false"></div>
  <div class="add__wrapper" :class="{open:isOpen}" @click="isOpen=true">
    <span v-if="!isOpen">+</span>
    <div v-else class="add__container">
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
      <label>Вопрос: <input type="text" data-type="question" v-model="question" @input="validate"></label>
      <label>Ответ: <input type="text" data-type="answer" v-model="answer" @input="validate"></label>
      <div>
        <input type="button" value="Очистить" @click="clear">
        <input type="button" value="Добавить" @click="add">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "itemAddComponent",
  data() {
    return {
      isOpen: false,
      question: "",
      answer: "",
      selectedDifficult: ""
    };
  },
  watch: {
    isOpen(flag) {
      if (flag) document.addEventListener("scroll", (e) => e.preventDefault());
    }
  },
  computed: {
    ...mapState(["orderDifficult"])
  },
  methods: {
    ...mapMutations("settings", ["addItem"]),
    clear() {
      this.question = "";
      this.answer = "";
      this.selectedDifficult = "easy";
    },
    validate(e) {
      const regexp = /[^a-zа-яё,.?!\s]/ig;
      const symbol = e.data;
      const type = e.target.dataset.type;
      const flag = symbol.match(regexp)?.length;
      this[type] = (!flag) ? this[type] : this[type].replace(regexp, "");
    },
    add() {
      if(this.question==='' || this.answer==='') return
      const item = {
        question: this.question,
        answer: this.answer
      };
      this.addItem({
        difficult: this.selectedDifficult,
        item
      });
      this.clear();
    }
  },
  created() {
    this.selectedDifficult = this.orderDifficult[0];
  }
};
</script>

<style lang="scss" scoped>
.add {

  &__layout {
    position: fixed;
    opacity: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: grey;
    z-index: -1;
    transition: opacity .25s linear;

    &.show {
      opacity: .7;
      z-index: 10;
    }
  }

  &__wrapper {
    height: 3rem;
    width: 3rem;
    position: fixed;
    bottom: 0;
    border-radius: 0.5rem;
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: width .25s linear,
    height .25s linear,
    bottom .25s linear,
    left .25s linear;

    &.open {
      width: 50%;
      height: 50%;
      cursor: default;
      z-index: 10;
      bottom: 25%;
      left: 25%;
      padding: .5rem;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;

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