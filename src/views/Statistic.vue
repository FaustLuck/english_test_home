<template>
  <loader-spinner v-if="loading"></loader-spinner>
  <div
    v-else
    class="user"
    v-for="(info, uid) of statistic"
    :class="{ priveleged: info.info?.priveleged }"
    :key="uid"
    @click="activeUser = uid"
  >
    <div class="user__info">
      <span>Имя: </span>
      <span class="date">{{ info.info?.displayName }}</span>
    </div>
    <keep-alive>
      <date-list :tests="info.statistic" v-if="activeUser === uid"></date-list>
    </keep-alive>
  </div>
</template>

<script>
import DateList from "@/components/DateList.vue";
import { mapState } from "vuex";

export default {
  name: "StatisticPage",
  components: {
    DateList,
  },
  data() {
    return {
      activeUser: "",
      loading: true,
    };
  },
  computed: {
    ...mapState(["statistic", "info"])
  },
  watch: {
    statistic: function (value) {
      if (!value) return;
      this.loading = false;
    },
  },
  async created() {
    await this.$store.dispatch("getStatistic");
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

  &.priveleged {
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