<template>
  <div class="card"
       :class="{
    right:right,
    wrong:wrong,
    edited:testItem?.edited,
    excluded:testItem?.excluded,
    included:testItem?.included
  }"
  >
    <slot class="card__column"></slot>
  </div>
</template>

<script>

export default {
  name: "itemComponent",
  props: {
    testItem: Object
  },
  computed: {
    right() {
      return ["result", "statistic"].includes(this.$route.name) && this.testItem.answer === this.testItem?.choice;
    },
    wrong() {
      return ["result", "statistic"].includes(this.$route.name) && !(this.testItem.answer === this.testItem?.choice);
    }
  }
};
</script>

<style lang="scss">
.card {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: 1rem 0;
  padding: .5rem;
  background-color: #FFDAB9;

  &.right {
    background-color: #8fbc8f;
  }

  &.wrong {
    background-color: #ff8c69;
  }

  &:hover > .tool {
    opacity: 1;
  }

  &.edited {
    background-color: #dddd5d;
    box-shadow: 0 0 10px 5px #959540;
  }

  &.excluded {
    user-select: none;
    cursor: not-allowed;
    background-color: #c5b6a9;
    box-shadow: 0 0 10px 5px #93887f;
  }

  &.included {
    background-color: #8fbc8f;
    box-shadow: 0 0 10px 5px #648b64;
  }

  &__column {
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
    }
  }
}
</style>