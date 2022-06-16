<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div v-else>
    <start-button></start-button>
    <div
      class="user"
      v-for="(value, userUID) of localStatistic"
      :class="{ first: value.info?.priveleged }"
      :key="userUID"
      @click="activeUser = userUID"
    >
      <div class="user__info" :class="{ single: !login }">
        <span v-if="login">Пользователь: </span>
        <span>{{ value.info.displayName }}</span>
      </div>
      <keep-alive>
        <date-list
          :tests="value.statistic"
          v-if="mode === 'result' || activeUser === userUID"
          :mode="mode"
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
      localStatistic: null,
    };
  },
  computed: {
    ...mapState("authorization", ["uid", "admin", "login", "displayName"]),
    ...mapState("statistic", ["statistic"]),
    ...mapState(["answers"]),
    mode() {
      return this.$router.currentRoute.value.name;
    },
  },
  watch: {
    statistic: function (value) {
      if (this.mode !== "statistic") return;
      if (!value || !Object.keys(value).length) return;
      this.loading = false;
      this.localStatistic = this.statistic;
    },
    login: async function (value) {
      if (value && this.mode === "statistic")
        await this.$store.dispatch("statistic/getStatistic", {
          uid: this.uid,
          admin: this.admin,
        });
    },
    mode: async function (value) {
      if (this.login && this.mode === "result") {
        this.$store.dispatch("setAnswer", { uid: this.uid });
      }
      if (value === "statistic") {
        await this.$store.dispatch("statistic/getStatistic", {
          uid: this.uid,
          admin: this.admin,
        });
      }
    },
    /*    loading: function (value) {
      if (value) return;
      if (this.mode !== "result") return;
      this.activeUser = this.uid;
    },*/
  },
  async created() {
    if (this.login && this.mode === "result") {
      this.$store.dispatch("setAnswer", { uid: this.uid });
      this.localStatistic = this.createResultStatistic();
      this.loading = false;
    }
    if (this.mode === "statistic") {
      await this.$store.dispatch("statistic/getStatistic", {
        uid: this.uid,
        admin: this.admin,
      });
    }
  },
  methods: {
    createResultStatistic() {
      let tmp = {};
      tmp[this.uid] = {
        info: {
          displayName: this.login ? this.displayName : "Вход не выполнен",
        },
        statistic: this.answers,
      };
      return tmp;
    },
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