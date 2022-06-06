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
      <div class="user__info">
        <span>Имя: </span>
        <span class="date">{{ info.info?.displayName }}</span>
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
import { mapState } from "vuex";
import StartButton from "@/components/UI/StartButton";

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
    ...mapState("statistic", ["statistic"]),
    ...mapState("authorization", ["uid", "admin", "login"]),
  },
  watch: {
    statistic: function (value) {
      if (!value) return;
      this.loading = false;
    },
    login: async function (value) {
      if (value)
        await this.$store.dispatch("statistic/getStatistic", {
          uid: this.uid,
          admin: this.admin,
        });
    },
  },
  async created() {
    await this.$store.dispatch("statistic/getStatistic", {
      uid: this.uid,
      admin: this.admin,
    });
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

    & > span {
      padding: 0 1rem;
    }

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
    }
  }
}
</style>
