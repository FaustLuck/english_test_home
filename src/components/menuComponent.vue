<template>
  <nav class="menu">
    <router-link v-if="isAdmin" title="Настройки" :to="{path:'settings'}">
      <img src="@/assets/settings.svg" alt="Настройки"
      /></router-link>
    <router-link v-if="isLogin" title="Статистика" :to="{path:'statistic'}"
    ><img src="@/assets/statistic.svg" alt="Статистика"
    /></router-link>
    <a @click="toLogin" :title="displayName"><img :src="photoURL" alt="Аватар"/></a>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "menuComponent",
  computed: {
    ...mapState("auth", ["isAdmin", "isLogin", "displayName", "photoURL"])
  },
  methods: {
    ...mapActions("auth", ["restoreLogin", "toLogin"])
  },
  async created() {
    await this.restoreLogin();
  }
};
</script>

<style lang="scss" scoped>
.menu {
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;

  & > a {
    height: 100%;
    padding: 0.5rem;

    & > img {
      height: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: row;
    left: 0;
    justify-content: center;
    height: 4rem;
    background-color: peachpuff;
    border-bottom: 1px solid black;
  }
}

</style>