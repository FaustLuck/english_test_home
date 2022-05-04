<template>
  <div class="card">
    <div class="card__item">
      <div class="card__item_container">
        <a v-if="mode == 'test'" class="voice" @click="speech">🔉</a>
        <input type="text" :readonly="mode != 'settings'" v-model="question" />
      </div>
    </div>
    <div class="card__item">
      <div
        class="card__item_container"
        v-for="(variant, varIndex) of answers"
        :key="varIndex"
      >
        <input
          v-if="mode != 'settings'"
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
          :value="variant"
          :readonly="mode != 'settings'"
          @click="check = variant"
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
          $emit('editRecord', { answer, question, index });
          clear();
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  /*
  пропсы из настроек для новой записи
v-if="activeIndex == difficult"
              :index="'newValue'"
              :item="{}"
              :editable="true"
              @editRecord="editRecord"

пропсы для остальных
v-for="item of settings.dictionary[difficult]"
            :key="item.question"
            :item="item"
            :index="item.question"
            :editable="true"
            @deleteRecord="deleteRecord(item)"
            @editRecord="editRecord"

  */
  name: "CardItem",
  props: {
    item: Object,
    difficult: String,
    index: Number,
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
  },
  mounted() {
    this.question = this.item.question;
    this.correctIndex = this.item.answer.findIndex((e) => e instanceof Object);
    this.answers = [...this.item.answer];
    this.answers[this.correctIndex] = this.answers[this.correctIndex].answer;
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

      &.editing {
        border: 1px solid black;
        margin: -1px;
      }
    }

    input[type="radio"] {
      transform: scale(2, 2);
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