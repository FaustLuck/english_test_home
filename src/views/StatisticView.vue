<template>
  <span>statistic</span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "StatisticView",
  computed: {
    ...mapState("auth", ["isLogin", "isAdmin", "uid"]),
  },
  methods: {
    ...mapActions("statistic", ["getStatistic"]),
  },
  async created() {
    if (!this.isLogin) this.$router.replace({name: "test"});
    await this.getStatistic({
      uid: this.uid,
      isAdmin: this.isAdmin
    });
  }
};
</script>

<style lang="scss" scoped>

</style>