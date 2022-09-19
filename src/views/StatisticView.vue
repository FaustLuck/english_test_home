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
    <div v-if="activeUserUID" class="date">
      <div class="date__item"
           :class="{open:activeDate===date}"
           v-for="[date,times] of dateList[activeUserUID]"
           :key="date"
           @click.capture="activeDate=(activeDate===date)?'':date"
      >
        <div :class="{'date__item-open':activeDate===date}">{{ date }} Тестов: {{ times.length }}</div>
        <div v-if="activeDate===date">
          <info-detail-component
            v-for="time of times" :key="date+time"
            :timestamp="timestamp(time)"
            :uid="activeUserUID"
          ></info-detail-component>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//todo переработать!
import { mapActions, mapState } from "vuex";
import PreloaderComponent from "@/components/preloaderComponent";
import UserCardComponent from "@/components/userCardComponent";
import InfoDetailComponent from "@/components/infoDetailComponent";
export default {
  name: "StatisticView",
  components: {InfoDetailComponent, UserCardComponent, PreloaderComponent},
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
    timestamp(time) {
      return Date.parse(`${this.activeDate.split(".").reverse().join("-")}T${time}`);
    }
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
      margin: 1rem;
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

.date {
  display: flex;
  flex-direction: column;

  &__item {
    text-align: center;
    background-color: #FFDAB9;
    box-shadow: 0 0 10px 5px #e9a66a;
    border-radius: 2rem;
    padding: .5rem 0;
    margin: 1rem;
    cursor: pointer;

    &-open {
      position: sticky;
      top: 0;
      background-color: #FFDAB9;
      margin-bottom: 1rem;
    }

    &.open {
      box-shadow: none;
    }
  }
}

</style>