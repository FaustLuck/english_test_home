<template>
  <div class="card">
    <div class="card__item" @click="toSpeech">
      <div class="card__item_container">
        <a class="voice" v-if="mode === 'test'">🔉</a>
        <input
          :class="{ voice: mode === 'test', editing: editing }"
          type="text"
          :readonly="!editing"
          v-model="question"
        />
      </div>
    </div>
    <div class="card__item" v-if="mode !== 'settings'">
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
          :checked="mode === 'statistic' && variant === check"
          :disabled="mode === 'statistic'"
        />
        <input
          :class="{
            correct: mode === 'statistic' && varIndex === correctIndex,
            wrong: mode === 'statistic' && varIndex !== correctIndex,
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
    <tool-menu
      v-if="mode === 'settings'"
      :newValue="index === 'newValue'"
      @editRecord="(payload) => (this.editing = payload)"
      @deleteRecord="$emit('deleteRecord', item)"
      @changeRecord="
        $emit('changeRecord', {
          answers: this.answers,
          question: this.question,
          index: this.index,
        });
        clear();
      "
    >
    </tool-menu>
  </div>
</template>
<script>
import { speech } from "@/utils";
import ToolMenu from "@/components/UI/ToolMenu";

export default {
  name: "CardItem",
  components: { ToolMenu },
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
      editing: this.mode === "settings" && this.index === "newValue",
      correctIndex: 0,
      answers: [],
      question: "",
      check: "",
      correct: false,
    };
  },
  watch: {
    check: function (value) {
      if (this.mode === "settings") return;
      let correct = value === this.answers[this.correctIndex];
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
        let regexp = /[^а-яА-ЯёЁ.,!?\s]/g;
        if (regexp.exec(value))
          this.answers[0] = this.answers[0].replaceAll(regexp, "");
      },
    },
    question: function (value) {
      let regexp = /[^a-zA-Z.,!?\s]/g;
      if (regexp.exec(value)) this.question = value.replaceAll(regexp, "");
    },
  },
  mounted() {
    if (this.index === "newValue") return;
    this.question = this.item.question;
    this.answers =
      this.mode === "settings" ? [this.item.answer] : [...this.item.answer];
    if (this.mode !== "settings") {
      this.correctIndex = this.item.answer.findIndex(
        (e) => e instanceof Object
      );
      this.answers[this.correctIndex] = this.answers[this.correctIndex].answer;
    }
    if (this.mode === "statistic") {
      this.check = this.item.answer[this.correctIndex].answer;
      this.correctIndex = this.item.answer.length - 1;
    }
  },
  methods: {
    toSpeech() {
      if (this.mode === "test") return speech(this.question);
    },
    clear() {
      if (this.index !== "newValue") return;
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

      &.voice {
        cursor: pointer;
      }
    }

    input[type="radio"] {
      transform: scale(2, 2);
      @media screen and (max-width: 768px) {
        transform: scale(1, 1);
      }
    }
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
