<template>
  <div class="container__menu">
    <nav class="menu">
      <router-link v-if="admin" title="Настройки" to="/settings">
        <img src="@/assets/settings.svg" alt="Настройки"
        /></router-link>
      <router-link v-if="login" title="Статистика" to="/statistic"
      ><img src="@/assets/statistic.svg"
      /></router-link>
      <login-button @click="loginMe"></login-button>
    </nav>
  </div>
  <form>
    <router-view/>
  </form>
</template>
<script>
import LoginButton from "@/components/LoginButton.vue";
import { mapState } from "vuex";


export default {
  components: {
    LoginButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('authorization', ['admin']),
    ...mapState(['login'])
  },
  watch: {
    admin: {
      deep: true,
      handler() {
        if (this.admin) this.$router.replace({ path: "/statistic" });
      },
    },
  },
  async created() {
    await this.$store.dispatch("authorization/restoreLogin");
  },
  methods: {
    async loginMe() {
      let login = this.$store.getters.getLogin;
      if (login) return;
      await this.$store.dispatch("authorization/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.container__menu {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;

  .menu {
    height: 2.5rem;
    display: flex;
    flex-direction: column;

    & > a {
      height: 100%;
      padding: 0.5rem;

      & > * {
        height: 100%;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: row;
    }
  }

  @media screen and (max-width: 768px) {
    left: 0;
    display: flex;
    justify-content: center;
    height: 4rem;
    background-color: peachpuff;
    border-bottom: 1px solid black;
  }
}

form {
  width: 80%;
  max-width: 1200px;
  padding: 0.5rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 4rem;
  }
}
</style>
