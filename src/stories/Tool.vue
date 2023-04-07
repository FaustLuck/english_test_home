<template>
  <button-component
          v-show="!editing && !excluded"
          @click="editStart"
          title="Редактировать"
          icon="mdi mdi-pencil-outline"
  />
  <button-component
          v-show="!editing && !excluded"
          @click="deleteItem"
          title="Удалить"
          icon="mdi mdi-delete"
  />
  <button-component
          v-show="editing"
          @click="editFinish"
          title="Готово"
          icon="mdi mdi-check"
  />
  <button-component
          v-show="!editing && (excluded || edited || included)"
          @click="undoChanges"
          title="Отменить"
          icon="mdi mdi-undo"
  />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/settings";

interface toolComponentProps {
  difficult: string,
  index: number,
  excluded?: boolean,
  edited?: boolean,
  included?: boolean
}

const ButtonComponent = defineAsyncComponent(() => import("@/stories/Button.vue"));

const props = defineProps<toolComponentProps>();
const store = useSettingsStore();

const { editingDifficult, editingIndex } = storeToRefs(store);
const editing = computed(() => {
  return editingDifficult.value === props.difficult && editingIndex.value === props.index;
});

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