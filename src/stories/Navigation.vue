<template>
  <v-navigation-drawer
          :rail="isCollapsed"
          elevation="5"
          class="bg-transparent"
          @click="$emit('toExpand')"
  >
      <v-list-item nav prepend-icon="mdi mdi-cog-outline" title="Настройки" value="Settings" to="/settings"/>
      <v-list-item nav prepend-icon="mdi mdi-content-save-outline" title="История" value="History" to="/users"/>

    <template v-slot:append v-if="!isCollapsed">
      <v-btn
        class="float-end"
              variant="text"
              icon="mdi mdi-chevron-left"
              @click.stop="$emit('toCollapse')"
      ></v-btn>
    </template>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{ isCollapsed: boolean }>();
</script>