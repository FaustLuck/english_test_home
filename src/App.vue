<template>
  <div class="container__menu">
    <nav class="menu">
      <router-link to="/settings">⚙️</router-link>
      <router-link to="/statistic">📊</router-link>
      <login-button></login-button>
    </nav>
  </div>
  <form>
    <router-view />
  </form>
</template>
<script>
import LoginButton from "@/components/LoginButton.vue";
export default {
  components: {
    LoginButton,
  },
};
</script>
<style lang="scss" scoped>
.container__menu {
  position: fixed;
  right: 0;
  top: 0;
  padding: 0.5rem;
  z-index: 5;
  @media screen and (max-width: 768px) {
    margin: 0;
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
    padding-top: 5rem;
  }
}
</style>
