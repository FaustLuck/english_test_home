<template>
<span>1</span>
</template>

<script>
import { useRouter } from "vue-router";
import { mapState } from "vuex";

export default {
  name: "ResultView",
  data() {
    return {};
  },
  computed: {
    ...mapState("test", ["answers"]),
    ...mapState(["orderDifficult"]),
    congratulation() {
      let lengthAnswers = (Object.values(this.answers)).reduce((acc, cur) => acc + cur.length, 0);
      let rightAnswers = (Object.values(this.answers)).reduce((acc, cur) => {
        return acc + cur.filter(el => el.answer === el.choice).length;
      }, 0);
      return lengthAnswers === rightAnswers;
    }
  },
  created() {
    if (!this.answers) return useRouter().replace({name: "test"});
  },
  mounted() {
    if (this.congratulation) setTimeout(() => {
      useRouter().push({name: "fire-show"});
    },3000);
  }
};
</script>

<style lang="scss" scoped>

</style>