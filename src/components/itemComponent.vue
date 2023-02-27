<template>
  <div class="card"
       :class="{
    right:mode && right,
    wrong:mode && !right,
    excluded:testItem?.excluded
  }"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "itemComponent",
  props: {
    testItem: Object
  },
  computed: {
    mode() {
      return ["result", "statistic"].includes(this.$route.name);
    },
    right(){
      return this.testItem.answer === this.testItem?.choice;
    }
  }
};
</script>

<style lang="scss">
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: .5rem 0;
  padding: .5rem;
  background-color: #FFDAB9;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &.right {
    background-color: #8fbc8f;
  }

  &.wrong {
    background-color: #ff8c69;
  }

  &:hover > .tool {
    opacity: 1;
  }

  &.excluded {
    user-select: none;
    cursor: not-allowed;
    background-color: #c5b6a9;
    box-shadow: 0 0 10px 5px #c9bcb1;
  }
}
</style>