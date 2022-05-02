<template>
  <nav class="menu">
    <router-link to="/settings">⚙️</router-link>
    <router-link to="/statistic">📊</router-link>
  </nav>
  <router-view />
</template>
<script>
export default{
}
</script>
<style lang="scss">
.menu {
  position: fixed;
  right: 0;
  top: 0;
  margin: .5rem;
}
</style>