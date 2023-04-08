<template>
  <v-container class="px-0 d-flex flex-column">
    <template v-if="!users">
      <card-user v-for="i of 3" :key="i"/>
    </template>

    <template v-else>
      <card-user v-for="user of users" :key="user.sub" :user="user"
                 @click="()=>changeActiveUser(user.sub)"/>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/store/auth";
import { useLoadingStore } from "@/store/loading";
import { useHistoryStore } from "@/store/history";

const CardUser = defineAsyncComponent(() => import("@/stories/CardUser.vue"));

const router = useRouter();
const activeUserSub = ref("");

function changeActiveUser(sub: string) {
  activeUserSub.value = sub;
  router.push({ name: "statistic", params: { sub: sub } });
}

const { users } = storeToRefs(useHistoryStore());
const { sub } = storeToRefs(useAuthStore());

onMounted(async () => {
  if (users.value.length) return;
  await useHistoryStore().getUsers(sub.value);
  useLoadingStore().setLoading(false);
});

</script>