<template>
  <span>{{title}}</span>
</template>

<script>
import { mapState } from "vuex";
import { useRouter ,useRoute} from "vue-router";

export default {
  name: "StatisticView",
  computed: {
    ...mapState("auth", ["isLogin"]),
    title() {
      return useRoute().name;
    }
  },
  created() {
    if (!this.isLogin) useRouter().replace({name: "test"});
  }
};
</script>

<style lang="scss" scoped>

</style>