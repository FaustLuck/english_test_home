<template>
  <v-btn
          v-show="!editing && !excluded"
          @click="editStart"
          title="Редактировать"
          icon="mdi mdi-pencil-outline"
          variant="text"
  />
  <v-btn
          v-show="!editing && !excluded"
          @click="deleteItem"
          title="Удалить"
          icon="mdi mdi-delete"
          variant="text"
  />
  <v-btn
          v-show="editing"
          @click="editFinish"
          title="Готово"
          icon="mdi mdi-check"
          variant="text"
  />
  <v-btn
          v-show="!editing && (excluded || edited || included)"
          @click="undoChanges"
          title="Отменить"
          icon="mdi mdi-undo"
          variant="text"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/settings";

interface toolComponentProps {
  difficult: string,
  index: number,
  excluded?: boolean,
  edited?: boolean,
  included?: boolean
}

const props = defineProps<toolComponentProps>();
const { index, difficult } = props;
const store = useSettingsStore();

const { editingDifficult, editingIndex } = storeToRefs(store);
const editing = computed(() => {
  return editingDifficult.value === difficult && editingIndex.value === index;
});

const editStart = () => {
  store.startEdit(index, difficult);
};
const editFinish = () => {
  store.finishEdit();
};
const deleteItem = () => {
  store.deleteItem(index, difficult);
};
const undoChanges = () => {
  if (props.included) {
    store.removeIncluded(index, difficult);
    return;
  }
  if (props.excluded) {
    store.returnDeletedItem(index, difficult);
    return;
  }
  if (props.edited) {
    store.cancelEdit(index, difficult);
  }
};
</script>
<style lang="scss">
img {
  height: 2rem;
}
</style>