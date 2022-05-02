<template>
  <div
    class="difficult"
    v-for="(array, difficult) in difficults"
    :key="difficult"
  >
    <div class="difficult__item">
      <span>{{ difficult }}</span>
    </div>
    <keep-alive>
      <card-item
        v-for="(item,index) of array"
        :key="item.question"
        :item="item"
        :index="index"
        :difficult="difficult"
      ></card-item>
    </keep-alive>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";
export default {
  components: { CardItem },
  name: "DifficultList",
  props: {
    difficults: Object,
  },
};
</script>

<style lang="scss" scoped>
.difficult {
  width: 100%;

  border: 1px solid black;
  margin: -1px;

  &__item {
    position: sticky;
    background-color: peachpuff;
    top: 0;
    z-index: 1;
    font-size: 60px;
    border-bottom: 1px solid black;
    font-size: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
  }
}
</style>