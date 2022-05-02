<template>
  <div class="card">
    <div class="card__item">
      <div class="card__item_container">
        <input
          @keyup="edit($event, 'question')"
          :readonly="!editing"
          :class="{ editing: editing }"
          v-model="question"
          type="text"
        />
        <a v-if="voice" class="voice" @click="speech">🔉</a>
      </div>
    </div>
    <div class="card__item">
      <div class="card__item_container">
        <input
          v-if="item.hasOwnProperty('correct') || !editable"
          :checked="item.correct"
          :name="difficult + '_' + index"
          type="radio"
        />
        <input
          type="text"
          :readonly="!editing"
          v-model="answer"
          @keyup="edit($event, 'answer')"
          :class="{
            correct: item.correct,
            wrong: item.hasOwnProperty('correct') && !item.correct,
            editing: editing,
          }"
        />
      </div>
      <div class="card__item_container">
        <input
          v-if="correctAnswer"
          :checked="!item.correct"
          :name="difficult + '_' + index"
          type="radio"
        />
        <input
          v-if="correctAnswer"
          type="text"
          :class="{ correct: !item.correct, wrong: item.correct }"
          v-model="correctAnswer"
        />
      </div>
    </div>
    <div class="card__item tool" :class="{ show: editing }" v-if="editable">
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
          $emit('editRecord', { answer, question, index });
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
    index: String,
    voice: {
      type: Boolean,
      default: false,
      required: false,
    },
    difficult: {
      type: String,
      default: "",
      required: false,
    },
    editable: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      editing: this.index == "newValue",
      question: this.item.question,
      answer: this.item.answer,
      correctAnswer: this.item.correctAnswer,
    };
  },
  methods: {
    speech(event) {
      let text = event.target.previousElementSibling.innerText;
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.75;
      window.speechSynthesis.speak(utterance);
    },
    edit(e, prop) {
      let regexp = /[^а-яА-ЯёЁa-zA-Z.,!?\s]/g;
      if (regexp.exec(e.key))
        this[prop] = e.target.value.replaceAll(regexp, "");
    },
    clear() {
      if (this.index != "newValue") return;
      this.question = "";
      this.answer = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 2rem;
  margin: -1px;
  border: 1px solid black;

  &:hover > .tool {
    opacity: 1;
  }

  &__item {
    width: 50%;
    padding: 0.5rem 1rem;

    &_container {
      display: flex;
      align-items: center;
    }

    input[type="text"] {
      height: 2rem;
      background-color: peachpuff;
      outline: 0;
      border-width: 0;
      font-family: "serif";
      font-size: 1.5rem;
      padding-left: 0.5rem;
      width: 100%;

      &.editing {
        border: 1px solid black;
        margin: -1px;
      }
    }

    &.tool {
      cursor: pointer;
      opacity: 0;
      width: 10%;
      padding: 0;
      height: 2rem;
      flex-direction: row;
      justify-content: space-between;
      position: absolute;
      right: -5rem;
      &.show {
        opacity: 1;
        justify-content: center;
      }
      img {
        height: 100%;
      }
    }

    &_edit {
      background-color: peachpuff;
      font-size: 2rem;
      font-family: "serif";
      border-width: 0;

      &:focus-visible {
        outline: none;
        border: 1px solid black;
        margin: -1px;
      }
    }

    .correct,
    .wrong {
      font-weight: 700;
      pointer-events: none;
    }

    .correct {
      color: green;
    }

    .wrong {
      color: red;
    }
  }

  .voice {
    margin-left: 1rem;
    cursor: pointer;
  }
}
</style>