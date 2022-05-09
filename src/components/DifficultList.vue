<template>
  <div class="difficult" v-for="difficult of order" :key="difficult">
    <div class="difficult__item" :class="{ congratulations: congratulations }">
      <span>{{ difficult }}</span>
    </div>
    <keep-alive>
      <card-item
        v-for="(item, index) of difficults[difficult]"
        :key="item.question"
        :item="item"
        :index="index"
        :difficult="difficult"
        :mode="'statistic'"
      ></card-item>
    </keep-alive>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
export default {
  components: { CardItem },
  name: "DifficultList",
  props: {
    difficults: Object,
    congratulations: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      order: [],
    };
  },
  mounted() {
    this.order = this.$store.getters.getOrder;
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
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    @media screen and (max-width: 768px) {
      font-size: 2rem;
      top: 4rem;
    }

    &.congratulations {
      background-color: darkseagreen;
    }
  }
}
</style>