<template>
  <div class="tool" :class="{ show: editing }">
    <img
      v-if="!editing && !excluded"
      src="@/assets/edit.svg"
      @click="startEdit({index,difficult})"
      alt="Редактировать"
      title="Редактировать"
    />
    <img
      v-if="!editing  && !excluded"
      src="@/assets/delete.svg"
      @click="deleteItem({index,difficult})"
      alt="Удалить"
      title="Удалить"
    />
    <img
      v-if="editing  && !excluded"
      src="@/assets/done.svg"
      @click="finishEdit"
      alt="Готово"
      title="Готово"
    />
    <img
      v-if="excluded || edited || included"
      src="@/assets/undo.svg"
      @click="undoChanges"
      alt="Отменить"
      title="Отменить"
    >
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "toolComponent",
  props: {
    difficult: String,
    index: Number,
    excluded: Boolean,
    edited: Boolean,
    included: Boolean
  },
  computed: {
    ...mapState("settings", ["editingDifficult", "editingIndex"]),
    editing() {
      return this.difficult === this.editingDifficult && this.index === this.editingIndex;
    }
  },
  methods: {
    ...mapMutations("settings", ["startEdit", "returnDeletedItem", "cancelEdit", "removeIncluded"]),
    ...mapActions("settings", ["finishEdit",'deleteItem']),
    undoChanges() {
      if (this.included) {
        this.removeIncluded({
          index: this.index,
          difficult: this.difficult
        });
        return;
      }
      if (this.excluded) {
        this.returnDeletedItem({
          index: this.index,
          difficult: this.difficult
        });
        return;
      }
      if (this.edited) {
        this.cancelEdit({
          index: this.index,
          difficult: this.difficult
        });
      }
    }
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
  width: 6rem;
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  right: -7rem;
  @media (any-hover: hover) {
    opacity: 0;
  }
  @media screen and (max-width: 768px) {
    right: 0;
    flex-direction: row;
    padding: 0;
    justify-content: space-evenly;
    opacity: 1;
    position: relative;
    width: 50%;
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