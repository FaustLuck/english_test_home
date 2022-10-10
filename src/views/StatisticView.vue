<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <section v-else class="users">
    <div class="users__container" v-show="!activeUserUID">
      <user-card-component
        v-for="(userInfo,uid) in statistic"
        :key="userInfo.info.displayName"
        :user="userInfo"
        :uid="uid"
        @changeActiveUser="changeActiveUser"
      >
      </user-card-component>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "StatisticView",
  components: {
    UserCardComponent:defineAsyncComponent(()=>import("@/components/userCardComponent")),
    PreloaderComponent:defineAsyncComponent(()=>import("@/components/preloaderComponent"))
  },
  data() {
    return {
      isLoading: true,
      activeUserUID: "",
      activeDate: ""
    };
  },
  computed: {
    ...mapState("auth", ["isAdmin", "isLogin", "uid"]),
    ...mapState("statistic", ["statistic", "dateList"]),
  },
  watch: {
    statistic(value) {
      if (!Object.keys(value).length) return;
      this.isLoading = false;
      if (!this.isAdmin) this.activeUserUID = Object.keys(this.statistic)[0];
    },
    async isLogin(value) {
      if (value) {
        await this.requestStatistic({
          uid: this.uid,
          isAdmin: this.isAdmin
        });
        await this.requestTimer();
      } else {
        this.$router.replace({name: "test"});
      }
    }
  },
  methods: {
    ...mapActions("statistic", ["requestStatistic"]),
    ...mapActions("settings", ["requestTimer"]),
    changeActiveUser(activeUser) {
      this.activeUserUID = activeUser;
      if (this.isAdmin) this.$router.push({name: "statistic-user", params: {uid: activeUser}});


    },
  },
  async created() {
    if (!this.isLogin) {
      this.$router.replace({name: "test"});
    } else {
      await this.requestStatistic({
        uid: this.uid,
        isAdmin: this.isAdmin
      });
      await this.requestTimer();
      this.changeActiveUser(this.uid);
    }
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