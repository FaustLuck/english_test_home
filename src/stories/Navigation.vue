<template>
  <v-navigation-drawer
          :rail="isCollapsed"
          elevation="5"
          class="bg-transparent"
          @click="$emit('toExpand')"
  >
      <v-list-item nav prepend-icon="mdi-cog-outline" title="Настройки" value="Settings" to="/settings"/>
      <v-list-item nav prepend-icon="mdi-content-save-outline" title="История" value="History" to="/users"/>

    <template v-slot:append>
      <v-btn
              variant="text"
              :icon="isCollapsed?'mdi-chevron-right':'mdi-chevron-left'"
              @click.stop="$emit('toToggle')"
      ></v-btn>
    </template>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{ isCollapsed: boolean }>();
</script>