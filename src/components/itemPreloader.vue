<template>
  <div class="preloader_item">
    <div class="preloader_item__line"></div>
    <div class="preloader_item__line"></div>
  </div>
</template>

<script>
export default {
  name: "itemPreloader"
};
</script>

<style lang="scss" scoped>
.preloader_item {
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  padding: 1rem;
  margin: 1rem 0;

  @media screen and (max-width: 768px) {
    padding: 1rem 0;
  }

  &__line{
    height: 1.5rem;
    width: 80%;
    border-radius: 1rem;
    background: linear-gradient(45deg, #ffc28c 25%, #ffffff, #ffc28c 55%);
    background-size: 400% 100%;
    animation-duration: 2s;
    animation-name: loading;
    animation-iteration-count: infinite;
  }
}

@keyframes loading {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 10%
  }
}
</style>