<template>
  <a @click="loginMe" :title="name"><img :src="photo" /></a>
</template>

<script>
export default {
  name: "LoginButton",
  props: {
    info: Object,
  },
  data() {
    return {
      photo: require("@/assets/google.svg"),
      name: "Войти с помощью Google",
      login: false,
    };
  },
  watch: {
    info: function (value) {
      this.photo = value.photo ? value.photo : require("@/assets/google.svg");
      this.name = value.name ? value.name : "Войти с помощью Google";
      this.login = value.login ? value.login : false;
    },
  },
  methods: {
    async loginMe() {
      if (this.login) return;
      await this.$store.dispatch("login", {});
      let info = this.$store.getters.getUserInfo;
      this.photo = info.photo;
      this.name = info.name;
      this.login = info.login;
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