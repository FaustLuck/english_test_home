<template>

  <header-component @toggleNavigation="open=!open"/>
  <template v-if="isLogin">
    <v-navigation-drawer
            elevation="5"
            color="default"
            v-model="open"
            width="350"
    >
      <navigation
              :is-open="open"
      />
      <template v-slot:append v-if="open">
        <v-btn
                class="float-end"
                variant="text"
                :icon="mdiChevronLeft"
                @click.stop="open=!open"
        ></v-btn>
      </template>

    </v-navigation-drawer>

  </template>


</template>

<script setup lang="ts">
import { mdiChevronLeft } from "@mdi/js";
import HeaderComponent from "@/components/app/AppHeader.vue";
import Navigation from "@/components/app/AppNav.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const open = ref(false);
const { isLogin } = storeToRefs(useAuthStore());
</script>