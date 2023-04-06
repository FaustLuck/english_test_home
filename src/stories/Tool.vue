<template>
  <button-component
          v-show="!editing && !excluded"
          @click="editStart"
          title="Редактировать"
  >
    <img src="@/assets/edit.svg" alt="Редактировать"/>
  </button-component>
  <button-component
          v-show="!editing && !excluded"
          @click="deleteItem"
          title="Удалить"
  >
    <img src="@/assets/delete.svg" alt="Удалить"/>
  </button-component>
  <button-component
          v-show="editing  && !excluded"
          @click="editFinish"
          title="Готово"
  >
    <img src="@/assets/done.svg" alt="Готово"/>
  </button-component>
  <button-component
          v-show="excluded || edited || included"
          @click="undoChanges"
          title="Отменить"
  >
    <img src="@/assets/undo.svg" alt="Отменить"/>
  </button-component>
</template>

<script setup lang="ts">
import { settingsStore } from "@/store/settingsStore";
import ButtonComponent from "@/stories/Button.vue";

interface toolComponentProps {
  difficult: string,
  index: number,
  excluded?: boolean,
  edited?: boolean,
  included?: boolean,
  editing?: boolean
}

const props = defineProps<toolComponentProps>();
const store = settingsStore();

const editStart = () => {
  store.startEdit(props.index, props.difficult);
};
const editFinish = () => {
  store.finishEdit();
};
const deleteItem = () => {
  store.deleteItem(props.index, props.difficult);
};
const undoChanges = () => {
  if (props.included) {
    store.removeIncluded(props.index, props.difficult);
    return;
  }
  if (props.excluded) {
    store.returnDeletedItem(props.index, props.difficult);
    return;
  }
  if (props.edited) {
    store.cancelEdit(props.index, props.difficult);
  }
};
</script>
<style lang="scss">
img {
  height: 2rem;
}
</style>