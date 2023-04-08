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

import { statisticStore } from "@/store/statisticStore";
import { useAuthStore } from "@/store/auth";
import { useCommonStore } from "@/store/common";

const CardUser = defineAsyncComponent(() => import("@/stories/CardUser.vue"));

const router = useRouter();
const activeUserSub = ref("");

function changeActiveUser(sub: string) {
  activeUserSub.value = sub;
  router.push({ name: "statistic", params: { sub: sub } });
}

const { users } = storeToRefs(statisticStore());
const { sub } = storeToRefs(useAuthStore());

onMounted(async () => {
  if (users.value) return;
  await statisticStore().getUsers(sub.value);
  useCommonStore().setLoading(false);
});

</script>