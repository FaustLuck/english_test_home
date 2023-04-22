<template>
  <v-navigation-drawer
          :rail="isCollapsed"
          elevation="5"
          color="default"
          @click="$emit('toExpand')"
          width="350"
  >
    <v-list-item nav :prepend-icon="mdiContentSaveOutline" title="История" value="History" to="/users"/>

    <template v-if="useHistoryStore().users.length>1 && !isCollapsed">
      <v-list>
        <v-list-group>
          <template v-slot:activator="{props}">
            <v-list-item nav v-bind="props" title="Пользователи" :prepend-icon="mdiAccountCircle"/>
          </template>

          <v-list-item
                  nav
                  v-for="user of useHistoryStore().users"
                  :key="user.key"
                  :title="user.name"
                  :value="user.name"
                  :prepend-avatar="user.picture"
                  :to="`/history/${user.sub}/year-${year}`"
          />
        </v-list-group>
      </v-list>
    </template>

    <!--    <v-list-item nav :prepend-icon="mdiCogOutline" title="Настройки" value="Settings" to="/settings"/>-->

    <template v-slot:append v-if="!isCollapsed">
      <v-btn
              class="float-end"
              variant="text"
              :icon="mdiChevronLeft"
              @click.stop="$emit('toCollapse')"
      ></v-btn>
    </template>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useHistoryStore } from "@/store/history";
import { ref } from "vue";
import { mdiContentSaveOutline, mdiAccountCircle, mdiCogOutline, mdiChevronLeft } from "@mdi/js";

const props = defineProps<{ isCollapsed: boolean }>();

const year = ref(new Date().getFullYear());

</script>