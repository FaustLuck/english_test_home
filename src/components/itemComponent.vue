<template>
  <div class="card"
       :class="{
    right:right,
    wrong:!right
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
      return this.$route.name;
    },
    right(){
      return this.mode!=='test'&& this.testItem.answer===this.testItem?.choice
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  align-items: center;
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
}
</style>