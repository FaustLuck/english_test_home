<template>
  <v-container class="px-0 d-flex flex-column">
    <template v-if="!users">
      <card-user v-for="i of 3" :key="i"/>
    </template>

    <template v-else>
      <card-user :class="{}" v-for="user of users" :key="user.sub" :user="user" @click="()=>changeActiveUser(user.sub)"/>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { statisticStore } from "@/store/statisticStore";
import { defineAsyncComponent } from "vue";
import { mainStore } from "@/store/mainStore";
import { useAuthStore } from "@/store/auth";

export default {
  name: "StatisticView",
  components: {
    CardUser: defineAsyncComponent(() => import("@/stories/CardUser.vue"))
  },
  data() {
    return {
      activeUserSub: ""
    };
  },
  computed: {
    ...mapState(statisticStore, ["users"]),
    ...mapState(useAuthStore, ["sub"])
  },
  methods: {
    ...mapActions(statisticStore, ["getUsers"]),
    ...mapActions(mainStore, ["setLoading"]),
    changeActiveUser(sub) {
      this.activeUserSub = sub;
      this.$router.push({name: "statistic", params: {sub: sub}});
    }
  },
  async created() {
    if (this.users) return;
    await this.getUsers(this.sub);
    this.setLoading(false);
  }
};
</script>

<style lang="scss" scoped>
.users {
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
  }
}

</style>