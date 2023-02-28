<template>
  <div class="tool" :class="{ show: editing }">
    <img
      v-if="!editing && !excluded"
      src="@/assets/edit.svg"
      @click="startEditing"
      alt="Редактировать"
      title="Редактировать"
    />
    <img
      v-if="!editing  && !excluded"
      src="@/assets/delete.svg"
      @click="deleteRecord"
      alt="Удалить"
      title="Удалить"
    />
    <img
      v-if="editing  && !excluded"
      src="@/assets/done.svg"
      @click="doneEditing"
      alt="Готово"
      title="Готово"
    />
    <img
      v-if="excluded || edited"
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
    edited: Boolean
  },
  computed: {
    ...mapState("settings", ["editingDifficult", "editingIndex"]),
    editing() {
      return this.difficult === this.editingDifficult && this.index === this.editingIndex;
    }
  },
  methods: {
    ...mapMutations("settings", ["startEdit", "deleteItem", "returnDeletedItem", "cancelEdit"]),
    ...mapActions("settings", ["finishEdit"]),
    startEditing() {
      this.startEdit({
        editingDifficult: this.difficult,
        editingIndex: this.index
      });
    },
    deleteRecord() {
      this.deleteItem({
        index: this.index,
        difficult: this.difficult
      });
    },
    undoChanges() {
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
    },
    doneEditing() {
      this.finishEdit();
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
  justify-content: space-between;
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