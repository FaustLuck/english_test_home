<template>
  <preloader-component v-if="isLoading"></preloader-component>
  <section v-else class="users">
    <user-card-component
      v-for="user of statistic"
      :key="user.info.displayName"
      :user="user"
      @changeActiveUser="(au)=>this.activeUser=au"
    >
    </user-card-component>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PreloaderComponent from "@/components/preloaderComponent";
import UserCardComponent from "@/components/userCardComponent";

export default {
  name: "StatisticView",
  components: {UserCardComponent, PreloaderComponent},
  data() {
    return {
      isLoading: true,
      activeUser: ""
    };
  },
  computed: {
    ...mapState("auth", ["isLogin", "isAdmin", "uid"]),
    ...mapState("statistic", ["statistic"])
  },
  watch: {
    statistic(value) {
      if (Object.keys(value).length) this.isLoading = false;
    },
   async isLogin(value) {
     if (value) {
       await this.getStatistic({
         uid: this.uid,
         isAdmin: this.isAdmin
       });
     } else {
       this.$router.replace({name: "test"});
     }
   },
    activeUser(value) {
      console.log(value);
    }
  },
  methods: {
    ...mapActions("statistic", ["getStatistic"]),
  },
  async created() {
    // if (!this.isLogin) this.$router.replace({name: "test"});
    if (this.isLogin) await this.getStatistic({
      uid: this.uid,
      isAdmin: this.isAdmin
    });
  }
};
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
}
</style>