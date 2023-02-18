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
    userCardComponent:defineAsyncComponent(()=>import("@/components/userCardComponent")),
    preloaderComponent:defineAsyncComponent(()=>import("@/components/preloaderComponent"))
  },
  data() {
    return {
      isLoading: true,
      activeUserUID: "",
      activeDate: "",
    };
  },
  computed: {
    ...mapState("auth", ["admin", "sub"]),
    ...mapState("statistic", ["statistic", "dateList"]),
  },
  methods: {
    ...mapActions("statistic", ["requestStatistic"]),
    ...mapActions("settings", ["requestTimer"]),
    changeActiveUser(activeUser) {
      this.activeUserUID = activeUser;
      this.$router.push({name: "statistic", params: {uid: activeUser}});
    },
    getData() {
      return this.requestStatistic({
        uid: this.uid,
        isAdmin: this.isAdmin
      });
    }
  },
  async created() {
    this.isLoading = !(await this.getData());
    await this.requestTimer();
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