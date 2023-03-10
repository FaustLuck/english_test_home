<template>
  <preloader-component v-if="!users"></preloader-component>
  <section class="users" v-else>
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
import { auth } from "@/store/auth";
import { statistic } from "@/store/statistic";
import { defineAsyncComponent } from "vue";

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
    ...mapState(statistic, ["users"]),
    ...mapState(auth, ["sub"])
  },
  methods: {
    ...mapActions(statistic, ["getUsers"]),
    changeActiveUser(sub) {
      this.activeUserSub = sub;
      this.$router.push({name: "statistic", params: {sub: sub}});
    }
  },
  async created() {
    await this.getUsers({sub: this.sub});
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