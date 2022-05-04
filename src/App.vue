<template>
  <nav class="menu">
    <router-link to="/settings">⚙️</router-link>
    <router-link to="/statistic">📊</router-link>
  </nav>
  <form>
    <router-view />
  </form>
</template>
<script>
export default {};
</script>
<style lang="scss">
.menu {
  position: fixed;
  right: 0;
  top: 0;
  margin: 0.5rem;
  z-index: 5;
  @media screen and (max-width: 768px) {
    left: 0;
    display: flex;
    justify-content: center;
  }
}
</style>