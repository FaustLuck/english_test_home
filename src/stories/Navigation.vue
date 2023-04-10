<template>
  <v-navigation-drawer
          :rail="isCollapsed"
          elevation="5"
          color="default"
          @click="$emit('toExpand')"
  >
    <v-list-item nav prepend-icon="mdi mdi-cog-outline" title="Настройки" value="Settings" to="/settings"/>
    <v-list-item nav prepend-icon="mdi mdi-content-save-outline" title="История" value="History" to="/users"/>

    <template v-if="users.length>1">
      <v-list-item
              nav
              v-for="user of users"
              :key="user.key"
              :title="user.name"
              :value="user.name"
              :prepend-avatar="user.picture"
              :to="`/history${user.sub}`"
      ></v-list-item>
    </template>

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
import { storeToRefs } from "pinia";
import { useHistoryStore } from "@/store/history";

const props = defineProps<{ isCollapsed: boolean }>();
const { users } = storeToRefs(useHistoryStore());
</script>