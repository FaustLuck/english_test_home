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
    <div v-if="isAdmin" v-show="activeUserUID" @click="activeUserUID=''; activeDate=''" class="users__close">
      <div class="users__close-cross"></div>
    </div>
    <div v-if="activeUserUID">
      <date-list-component
        v-for="[date,timeArray] of dateList[activeUserUID]"
        :key="date"
        :active-user-u-i-d="activeUserUID"
        :active-date="activeDate"
        :date="date"
        :time-array="timeArray"
        @changeDate="activeDate=(activeDate===date)?'':date"
      >
      </date-list-component>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "StatisticView",
  components: {
    DateListComponent:defineAsyncComponent(()=>import("@/components/dateListComponent")),
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
    ...mapState("auth", ["isLogin", "isAdmin",]),
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
       await this.getStatistic({
         uid: this.uid,
         isAdmin: this.isAdmin
       });
     } else {
       this.$router.replace({name: "test"});
     }
   }
  },
  methods: {
    ...mapActions("statistic", ["getStatistic"]),
    changeActiveUser(activeUser) {
      this.activeUserUID = activeUser;
    },
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
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__close {
    position: absolute;
    height: 100%;
    right: -5rem;

    &-cross {
      position: sticky;
      top: 1rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFDAB9;
      box-shadow: 0 0 10px 5px #e9a66a;
      border-radius: 2rem;
      padding: 0.5rem;
      cursor: pointer;

      &::before,
      &::after {
        position: absolute;
        content: '';
        background-color: #000;
        width: 3px;
        height: 66%;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}

</style>