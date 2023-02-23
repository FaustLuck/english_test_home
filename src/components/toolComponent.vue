<template>
  <div class="tool" :class="{ show: editing }">
    <img
      v-if="!editing"
      src="@/assets/edit.svg"
      @click="changeEditing(true)"
      alt="Редактировать"
    />
    <img
      v-if="!editing"
      src="@/assets/delete.svg"
      @click="deleteRecord"
      alt="Удалить"
    />
    <img
      v-if="editing"
      src="@/assets/done.svg"
      @click="changeEditing(false)"
      alt="Готово"
    />
  </div>
</template>

<script>
export default {
  name: "toolComponent",
  props: {
    index: Number,
  },
  data() {
    return {
      editing: this.index === -1,
    };
  },
  methods: {
    changeEditing(flag) {
      if (this.index === -1) return this.$emit("addRecord");
      this.editing = flag;
      this.$emit("changeEditing", flag);
    },
    deleteRecord() {
      this.$emit("deleteRecord");
    },
  },
};
</script>

<style lang="scss" scoped>
.tool {
  cursor: pointer;
  opacity: 1;
  display: flex;
  padding: 1rem;
  height: 2rem;
  width: 5rem;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  right: -7rem;
  //@media (any-hover: hover) {
  //  opacity: 0;
  //}
  @media screen and (max-width: 768px) {
    right: 0;
    flex-direction: column;
    padding: 0;
    justify-content: center;
    opacity: 1;
  }
  //&.show {
  //  opacity: 1;
  //  justify-content: center;
  //}
  img {
    height: 100%;
  }
}
</style>