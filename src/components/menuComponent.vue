<template>
  <nav class="menu">
    <router-link v-if="admin" title="Настройки" :to="{path:'settings'}">
      <img src="@/assets/settings.svg" alt="Настройки"
      /></router-link>
    <router-link v-if="isLogin" title="История" :to="{path:'users'}"
    ><img src="@/assets/statistic.svg" alt="Статистика"
    /></router-link>
    <a v-if="!isLogin" id="google"></a>
    <a v-else :title="name"><img :src="picture" alt="Аватар"/></a>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "menuComponent",
  computed: {
    ...mapState("auth", ["admin", "isLogin", "name", "picture"])
  },
  methods: {
    ...mapActions("auth", ["googleInitialize"]),
    ...mapMutations(["setMenuHeight"]),
    setHeight() {
      let h = this.$el.getBoundingClientRect().height;
      this.setMenuHeight(h);
    }
  },
  async created() {
    await this.googleInitialize();
    window.addEventListener("resize", this.setHeight);
    if (window.matchMedia("(max-width: 768px)").matches) {
      this.setHeight();
    }
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
    margin: 0.5rem;
    cursor: pointer;
    @media screen and (max-width: 768px) {
      height: auto;
    }

    & > img {
      height: 100%;
      border-radius: 50%;
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