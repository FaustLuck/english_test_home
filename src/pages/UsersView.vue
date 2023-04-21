<template>
  <template v-if="users.length===0">
    <card-user-component v-for="i of 3" :key="i"/>
  </template>

  <template v-else>
    <card-user-component v-for="user of users" :key="user.sub" :user="user"
                         @click="()=>changeActiveUser(user.sub)"/>
  </template>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { useHistoryStore } from "@/store/history";

const CardUserComponent = defineAsyncComponent(() => import("@/stories/cards/CardUser.vue"));

const router = useRouter();
const activeUserSub = ref("");
const year = ref(new Date().getFullYear());

function changeActiveUser(sub: string) {
  activeUserSub.value = sub;
  router.push({ name: "year", params: { sub: sub, year: year.value } });
}

const { users } = storeToRefs(useHistoryStore());
const { sub } = storeToRefs(useAuthStore());

onMounted(async () => {
  if (!users.value.length) await useHistoryStore().getUsers(sub.value);
  if (users.value.length === 1) await router.replace({
    name: "year", params: { sub: sub.value, year: year.value }
  });
});

</script>