<template>
  <a :title="displayName"><img :src="photoURL" alt="Аватар"/></a>
</template>

<script>
export default {
  name: "LoginButton",
  computed: {
    displayName() {
      return this.$store.getters.getUserInfo.displayName;
    },
    photoURL() {
      return this.$store.getters.getUserInfo.photoURL;
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