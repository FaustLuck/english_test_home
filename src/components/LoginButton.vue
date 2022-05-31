<template>
  <a :title="displayName"><img :src="photoURL" alt="Аватар"/></a>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginButton",
  computed: {
    ...mapState('authorization', ['displayName', 'photoURL'])
  },
};
</script>

<style lang="scss" scoped>
img {
  height: 100%;
  cursor: pointer;
}
</style>