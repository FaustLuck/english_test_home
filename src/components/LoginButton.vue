<template>
  <input type="button" value="Войти" @click="loginMe" />
</template>

<script>
export default {
  name: "LoginButton",
  methods: {
    loginMe() {
      this.$store.dispatch("login", {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>