<template>
  <layout-component></layout-component>
  <menu-component></menu-component>
  <form>
    <router-view/>
  </form>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    LayoutComponent: defineAsyncComponent(() => import("@/components/layoutComponent")),
    menuComponent: defineAsyncComponent(() => import("@/components/menuComponent"))
  },
  computed: {
    ...mapState("test", ["timeLeft"])
  },
  watch: {
    timeLeft(value) {
      if (value === 0) {
        document.body.classList.add("fail");
        setTimeout(() => {
          this.changeTestStatus(false);
          this.$router.push("result");
          document.body.classList.remove("fail")
        }, 5000);
      }
    }
  },
  methods: {
    ...mapMutations("test", ["changeTestStatus"])
  }


};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

body {
  font-family: 'serif';

  &.fail {
    background-color: red;
    pointer-events: none;
  }
}

#app {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  font-size: 40px;
}

form {
  width: 80%;
  max-width: 1200px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-top: 4rem;
  }
}
</style>