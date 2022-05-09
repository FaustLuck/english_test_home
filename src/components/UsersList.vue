<template>
  <div>
    <div
      class="user"
      v-for="user in users"
      :key="user.uid"
      @click="
      activeUser = user.uid;
      "
    >
      <span>Имя:</span>
      <span>{{ user.name }}</span>
    </div>
    <keep-alive>
      <test-result v-if="(activeUser = user.name)"> </test-result>
    </keep-alive>
  </div>
</template>

<script>
import TestResult from "@/components/TestResult.vue";
export default {
  name: "UsersList",
  props: {
    users: Object,
  },
  components: {
    TestResult,
  },
  data() {
    return {
      activeUser: "",
    };
  },
  mounted() {
    if (Object.keys(this.users).length == 1)
      this.activeUser = this.users[Object.keys(this.users)].uid;
  },
};
</script>

<style lang="scss" scoped>
</style>