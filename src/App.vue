<template>
  <div class="container__menu">
    <nav class="menu">
      <router-link v-if="isAdmin" title="Настройки" to="/settings">
        <img src="@/assets/settings.svg" alt="Настройки"
        /></router-link>
      <router-link v-if="isLogin" title="Статистика" to="/statistic"
      ><img src="@/assets/statistic.svg" alt="Статистика"
      /></router-link>
      <login-button @click="toLogin"></login-button>
    </nav>
  </div>
  <form>
    <router-view :key="$route.name"/>
  </form>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { defineAsyncComponent } from "vue";

export default {
  components: {
    LoginButton: defineAsyncComponent(() => import("@/components/LoginButton.vue")),
  },
  computed: {
    ...mapState("authorization", ["isAdmin", "isLogin"]),
  },
  async created() {
    await this.restoreLogin();
  },
  methods: {
    ...mapActions("authorization", ["restoreLogin", "toLogin"]),
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

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 4rem;
  }
}
</style>
