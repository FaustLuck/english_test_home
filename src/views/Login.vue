<template>
  <input type="button" value="click" @click="loginMe" />
</template>

<script>
export default {
  name: "loginPage",
  methods: {
    loginMe() {
      this.$store.dispatch("login", {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>