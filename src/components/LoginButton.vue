<template>
  <a @click="loginMe" :title="title"><img :src="src" /></a>
</template>

<script>
export default {
  name: "LoginButton",
  data() {
    return {
      src: require("@/assets/google.svg"),
      title: "Войти с помощью Google",
    };
  },
  methods: {
    async loginMe() {
      if (this.$store.getters.getUID) return;
      await this.$store.dispatch("login", {});
      let data = this.$store.getters.getUserInfo;
      this.src = data.src;
      this.title = data.title;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 100%;
  cursor: pointer;
}
</style>