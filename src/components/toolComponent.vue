<template>
  <div class="tool" :class="{ show: editing }">
    <img
      v-if="!editing && !excluded"
      src="@/assets/edit.svg"
      @click="startEditing"
      alt="Редактировать"
    />
    <img
      v-if="!editing  && !excluded"
      src="@/assets/delete.svg"
      @click="deleteRecord"
      alt="Удалить"
    />
    <img
      v-if="editing  && !excluded"
      src="@/assets/done.svg"
      @click="cancelEditItem"
      alt="Готово"
    />
    <img
    v-if="excluded"
    src="@/assets/undo.svg"
    @click="UndoExclude"
    alt="Отменить"
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "toolComponent",
  props: {
    difficult: String,
    index: Number,
    excluded:Boolean
  },
  computed: {
    ...mapState("settings", ["editingDifficult", "editingIndex"]),
    editing() {
      return this.difficult === this.editingDifficult && this.index === this.editingIndex;
    }
  },
  methods: {
    ...mapMutations("settings", ["startEditItem", "cancelEditItem", "deleteItem",'returnDeletedItem']),
    startEditing() {
      this.startEditItem({
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
    UndoExclude(){
      this.returnDeletedItem({
        index: this.index,
        difficult: this.difficult
      })
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