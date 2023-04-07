<template>
  <preloader-component></preloader-component>
  <section class="users" v-if="users">
    <div class="users__container" v-show="!activeUserSub">
      <user-card-component
        v-for="user of users"
        :key="user.sub"
        :user="user"
        @changeActiveUser="changeActiveUser"
      >
      </user-card-component>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { authStore } from "@/store/authStore";
import { statisticStore } from "@/store/statisticStore";
import { defineAsyncComponent } from "vue";
import { mainStore } from "@/store/mainStore";

export default {
  name: "StatisticView",
  components: {
    userCardComponent: defineAsyncComponent(() => import("@/components/userCardComponent.vue")),
    preloaderComponent: defineAsyncComponent(() => import("@/components/preloaderComponent.vue"))
  },
  data() {
    return {
      activeUserSub: ""
    };
  },
  computed: {
    ...mapState(statisticStore, ["users"]),
    ...mapState(authStore, ["sub"])
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