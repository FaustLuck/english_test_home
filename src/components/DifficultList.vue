<template>
  <div class="difficult" v-for="difficult of order" :key="difficult">
    <div
      v-if="['statistic', 'result'].includes(mode)"
      class="difficult__container"
      :class="{ congratulations: congratulations }"
    >
      <span>{{ difficult }}</span>
    </div>
    <div
      v-if="mode === 'settings' && questions[difficult].length"
      class="difficult__container settings"
    >
      <div class="difficult__container_item">
        <span>Количество вопросов {{ difficult }}</span>
        <span>
          <input
            type="number"
            v-model.number="localLimits[difficult]"
            v-on:blur="updateLimit(difficult)"
            @input="checkCount($event.target.value, difficult)"
          />
        </span>
      </div>
      <card-container
        :item="newItem[difficult]"
        :difficult="difficult"
        :index="-1"
        :mode="mode"
        @updateNewItem="
          ({ prop, record }) => (newItem[difficult][prop] = record)
        "
        @addRecord="addRecord(difficult)"
      ></card-container>
    </div>
    <div v-for="(item, index) of questions[difficult]" :key="item.question">
      <card-container
        :item="item"
        :difficult="difficult"
        :index="index"
        :mode="mode"
      ></card-container>
    </div>
  </div>
</template>
<script>
import CardContainer from "@/components/CardContainer";

export default {
  name: "DifficultList",
  components: {
    CardContainer,
  },
  props: {
    questions: Object,
    limits: Object,
    congratulations: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      order: ["easy", "medium", "hard"],
      localLimits: this.limits,
      newItem: {
        easy: { answer: "", question: "" },
        medium: { answer: "", question: "" },
        hard: { answer: "", question: "" },
      },
    };
  },
  computed: {
    mode() {
      return `${this.$router.currentRoute.value.name}`;
    },
  },
  methods: {
    checkCount(value, difficult) {
      let max = this.questions[difficult].length;
      if (value > max) this.localLimits[difficult] = max;
    },
    updateLimit(difficult) {
      this.$store.commit("settings/SAVE_LIMIT", {
        difficult,
        limit: this.localLimits[difficult],
      });
    },
    addRecord(difficult) {
      this.$store.commit("settings/ADD_RECORD", {
        difficult,
        item: this.newItem[difficult],
      });
      this.newItem[difficult] = { answer: "", question: "" };
    },
  },
};
</script>

<style lang="scss" scoped>
.difficult {
  width: 100%;

  border: 1px solid black;
  margin: -1px;

  &__container {
    position: sticky;
    background-color: peachpuff;
    top: 4rem;
    z-index: 1;
    font-size: 3.75rem;
    border-bottom: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      top: 6.5rem;
    }

    &.congratulations {
      background-color: darkseagreen;
    }

    &.settings {
      display: block;
      padding: 0;
      top: 0;
    }

    &_item {
      display: flex;
      font-size: 2.5rem;
      justify-content: space-between;
      padding: 0.5rem 1rem;

      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }

  input[type="number"] {
    width: 60px;
    cursor: default;
    outline: none;
    font-size: 40px;
    text-align: center;
    font-family: "serif";

    &::-webkit-inner-spin-button {
      display: none;
    }
  }
}

.question {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  font-size: 2rem;
  margin: -1px;
  border: 1px solid black;
  padding: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    font-size: 1rem;
    justify-content: flex-start;
  }
}
</style>