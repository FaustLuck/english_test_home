<template>
  <v-navigation-drawer
          :rail="isCollapsed"
          elevation="5"
          color="default"
          @click="$emit('toExpand')"
          width="350"
  >
    <v-list-item nav prepend-icon="mdi mdi-content-save-outline" title="История" value="History" to="/users"/>

    <template v-if="useHistoryStore().users.length>1 && !isCollapsed">
      <v-list>
        <v-list-group>
          <template v-slot:activator="{props}">
            <v-list-item nav v-bind="props" title="Пользователи" prepend-icon="mdi mdi-account-circle"/>
          </template>

          <v-list-item
                  nav
                  v-for="user of useHistoryStore().users"
                  :key="user.key"
                  :title="user.name"
                  :value="user.name"
                  :prepend-avatar="user.picture"
                  :to="`/history/${user.sub}/`"
          />
        </v-list-group>
      </v-list>
    </template>

    <v-list-item nav prepend-icon="mdi mdi-cog-outline" title="Настройки" value="Settings" to="/settings"/>

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
import { useHistoryStore } from "@/store/history";

const props = defineProps<{ isCollapsed: boolean }>();

</script>