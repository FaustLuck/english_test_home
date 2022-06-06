<template>
  <div class="tool" :class="{ show: editing }">
    <img
      v-if="!editing"
      src="@/assets/edit.svg"
      @click="editRecord(true)"
      alt="Редактировать"
    />
    <img
      v-if="!editing"
      src="@/assets/delete.svg"
      @click="$emit('deleteRecord')"
      alt="Удалить"
    />
    <img
      v-if="editing"
      src="@/assets/done.svg"
      @click="
        editRecord(false);
        $emit('changeRecord');
      "
      alt="Готово"
    />
  </div>
</template>

<script>
export default {
  name: "ToolMenu",
  props: {
    newValue: Boolean,
  },
  data() {
    return {
      editing: this.newValue,
    };
  },
  methods: {
    editRecord(flag) {
      this.editing = this.newValue || flag;
      this.$emit("editRecord", this.editing);
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

  @media (any-hover: hover) {
    opacity: 0;
  }

  @media screen and (max-width: 768px) {
    right: 0;
    flex-direction: column;
    padding: 0;
    justify-content: center;
    opacity: 1;
  }

  &.show {
    opacity: 1;
    justify-content: center;
  }

  img {
    height: 100%;
  }
}
</style>
