<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div v-else>
    <start-button></start-button>
    <div
      class="user"
      v-for="(info, userUID) of statistic"
      :class="{ first: info.info?.priveleged }"
      :key="userUID"
      @click="activeUser = userUID"
    >
      <div class="user__info" :class="{ single: !login }">
        <span v-if="login">Имя: </span>
        <span>{{ info.info.displayName }}</span>
      </div>
      <keep-alive>
        <date-list
          :tests="info.statistic"
          v-if="activeUser === userUID"
        ></date-list>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import DateList from "@/components/DateList.vue";
import StartButton from "@/components/StartButton";
import { mapState } from "vuex";

export default {
  name: "StatisticPage",
  components: {
    StartButton,
    DateList,
  },
  data() {
    return {
      activeUser: "",
      loading: true,
    };
  },
  computed: {
    ...mapState("authorization", ["uid", "admin", "login", "displayName"]),
    mode() {
      return this.$router.currentRoute.value.name;
    },
    statistic() {
      if (this.mode === "statistic") {
        return this.$store.getters["statistic/getStatistic"];
      }
      let tmp = {};
      tmp[this.uid] = {
        info: {
          displayName: this.login ? this.displayName : "Вход не выполнен",
        },
        statistic: this.$store.getters["getAnswer"],
      };
      return tmp;
    },
  },
  watch: {
    statistic: function (value) {
      if (!value || !Object.keys(value).length) return;
      this.loading = false;
    },
    login: async function (value) {
      if (value && this.mode === "statistic")
        await this.$store.dispatch("statistic/getStatistic", {
          uid: this.uid,
          admin: this.admin,
        });
    },
  },
  async created() {
    if (Object.keys(this.statistic).length) this.loading = false;
    if (this.login && this.mode === "result")
      this.$store.dispatch("setAnswer", { uid: this.uid });
    if (this.mode === "statistic") {
      await this.$store.dispatch("statistic/getStatistic", {
        uid: this.uid,
        admin: this.admin,
      });
    }
  },
  beforeRouteLeave() {
    this.loading = true;
  },
  async updated() {
    if (this.login && this.mode === "result")
      this.$store.dispatch("setAnswer", { uid: this.uid });
    if (this.mode === "statistic") {
      await this.$store.dispatch("statistic/getStatistic", {
        uid: this.uid,
        admin: this.admin,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.user {
  border: 1px solid black;
  margin: -1px;
  cursor: default;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  &.first {
    order: 0;
  }

  &__info {
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.single {
      justify-content: center;
    }

    & > span {
      padding: 0 1rem;
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
}
</style>