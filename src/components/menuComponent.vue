<template>
  <nav class="menu">
    <router-link v-if="sub" title="Настройки" :to="{path:'settings'}">
      <img src="@/assets/settings.svg" alt="Настройки"
      /></router-link>
    <router-link v-if="tests" title="История" :to="{path:'users'}"
    ><img src="@/assets/history.svg" alt="История"
    /></router-link>
    <a v-if="!sub" id="google"></a>
    <a v-else :title="name"><img :src="picture" alt="Аватар"/></a>
  </nav>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { authStore } from "@/store/authStore";
import { mainStore } from "@/store/mainStore";

export default {
  name: "menuComponent",
  computed: {
    ...mapState(authStore, ["admin", "sub", "name", "picture", "tests"])
  },
  methods: {
    ...mapActions(authStore, ["googleInitialize"]),
    ...mapActions(mainStore, ["setMenuHeight"]),
    setHeight() {
      if (!window.matchMedia("(max-width: 768px)").matches) return;
      let h = this.$el.getBoundingClientRect().height;
      this.setMenuHeight(h);
    }
  },
  async created() {
    await this.googleInitialize();
    window.addEventListener("resize", this.setHeight);
    this.setHeight();
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

  @media screen and (max-width: 576px) {
    height: 3rem;
  }
}

</style>