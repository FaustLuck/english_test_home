<template>
  <div class="card">
    <div class="card__item">
      <div class="card__item_container">
        <a v-if="mode == 'test'" class="voice" @click="speech">🔉</a>
        <input
          type="text"
          :readonly="!editing"
          v-model="question"
          :class="{ editing: editing }"
        />
      </div>
    </div>
    <div class="card__item" v-if="mode != 'settings'">
      <div
        class="card__item_container"
        v-for="(variant, varIndex) of answers"
        :key="varIndex"
      >
        <input
          type="radio"
          :name="difficult + '_' + index"
          :value="variant"
          v-model="check"
          :checked="mode == 'statistic' && variant == check"
          :disabled="mode == 'statistic'"
        />
        <input
          :class="{
            correct: mode == 'statistic' && varIndex == correctIndex,
            wrong: mode == 'statistic' && varIndex != correctIndex,
          }"
          type="text"
          readonly
          @click="check = variant"
          :value="variant"
        />
      </div>
    </div>
    <div class="card__item" v-else>
      <div class="card__item_container">
        <input
          :class="{
            editing: editing,
          }"
          type="text"
          :readonly="!editing"
          v-model="answers[0]"
        />
      </div>
    </div>

    <div
      v-if="mode == 'settings'"
      class="card__item tool"
      :class="{ show: editing }"
    >
      <img v-if="!editing" src="@/assets/edit.svg" @click="editing = true" />
      <img
        v-if="!editing"
        src="@/assets/delete.svg"
        @click="$emit('deleteRecord', item)"
      />
      <img
        v-if="editing"
        src="@/assets/done.svg"
        @click="
          editing = index == 'newValue' || false;
          $emit('editRecord', { answers, question, index });
          clear();
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    item: Object,
    difficult: String,
    index: [Number, String],
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editing: this.mode == "settings" && this.index == "newValue",
      correctIndex: 0,
      answers: [],
      question: "",
      check: "",
      correct: false,
    };
  },
  watch: {
    check: function (value) {
      if (this.mode == "settings") return;
      let correct = value == this.answers[this.correctIndex];
      let answer = {
        question: this.question,
        answer: [
          {
            answer: this.check,
            correct,
          },
        ],
      };
      if (!correct) answer.answer.push(this.answers[this.correctIndex]);
      this.$emit("updateAnswers", {
        answer,
        difficult: this.difficult,
        index: this.index,
      });
    },
    answers: {
      deep: true,
      handler(value) {
        let regexp = /[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;
        if (regexp.exec(value))
          this.answers[0] = this.answers[0].replaceAll(regexp, "");
      },
    },
    question: function (value) {
      let regexp = /[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;
      if (regexp.exec(value)) this.question = value.replaceAll(regexp, "");
    },
  },
  mounted() {
    if (this.index == "newValue") return;
    this.question = this.item.question;
    this.answers =
      this.mode == "settings" ? [this.item.answer] : [...this.item.answer];
    if (this.mode != "settings") {
      this.correctIndex = this.item.answer.findIndex(
        (e) => e instanceof Object
      );
      this.answers[this.correctIndex] = this.answers[this.correctIndex].answer;
    }
    if (this.mode == "statistic") {
      this.check = this.item.answer[this.correctIndex].answer;
      this.correctIndex = this.item.answer.length - 1;
    }
  },
  methods: {
    speech(event) {
      let text = event.target.nextElementSibling.innerText;
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.75;
      window.speechSynthesis.speak(utterance);
    },
    clear() {
      if (this.index != "newValue") return;
      this.question = "";
      this.answers[0] = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  font-size: 2rem;
  margin: -1px;
  border: 1px solid black;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: flex-start;
  }

  &:hover > .tool {
    opacity: 1;
  }

  &__item {
    padding: 0.5rem 1rem;

    &_container {
      display: flex;
      align-items: center;

      label {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }

    input[type="text"] {
      height: 2rem;
      background-color: transparent;
      outline: 0;
      border-width: 0;
      font-family: "serif";
      font-size: 1.5rem;
      padding-left: 0.5rem;
      width: 100%;
      cursor: default;

      @media screen and (max-width: 768px) {
        font-size: 1rem;
      }

      &.editing {
        border: 1px solid black;
        margin: -1px;
      }
    }

    input[type="radio"] {
      transform: scale(2, 2);
      @media screen and (max-width: 768px) {
        transform: scale(1, 1);
      }
    }

    &.tool {
      cursor: pointer;
      opacity: 1;
      padding: 0;
      height: 2rem;
      flex-direction: row;
      justify-content: space-between;
      position: absolute;
      right: -5rem;
      @media (any-hover: hover) {
        opacity: 0;
      }

      @media screen and (max-width: 768px) {
        right: 1rem;
      }

      &.show {
        opacity: 1;
        justify-content: center;
      }
      img {
        height: 100%;
      }
    }
  }

  .voice {
    margin-left: 1rem;
    cursor: pointer;
  }

  .wrong {
    color: red;
    font-weight: 700;
  }
  .correct {
    color: green;
    font-weight: 700;
  }
}
</style>