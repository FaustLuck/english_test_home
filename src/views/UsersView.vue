<template>
  <section class="users">
    <div class="users__container" v-show="!activeUserSub">
      <user-card-component
        v-for="user of users"
        :key="user.sub"
        :user="user"
        @changeActiveUser="changeActiveUser"
      >
      </user-card-component>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  name: "StatisticView",
  components: {
    userCardComponent: defineAsyncComponent(() => import("@/components/userCardComponent")),
  },
  data() {
    return {
      activeUserSub: ""
    };
  },
  computed: {
    ...mapState("statistic", ["users"]),
  },
  methods: {
    changeActiveUser(sub) {
      this.activeUserSub = sub;
      this.$router.push({name: "statistic", params: {sub: sub}});
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