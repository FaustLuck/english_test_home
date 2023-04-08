<template>
  <v-navigation-drawer :temporary="drawer" elevation="5" color="default">
    <v-list>
      <v-list-item prepend-icon="mdi mdi-cog-outline" title="Настройки" value="Settings"/>
      <v-list-item prepend-icon="mdi mdi-content-save-outline" title="История" value="History"/>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: Boolean
  }
};
</script>