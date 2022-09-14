<template>
  <div class="container__preloader">
    <div class="preloader">
      <div class="outer circle">
        <div class="spinner"></div>
      </div>
      <div class="inner circle"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'preloaderComponent'
}
</script>
<style lang="scss" scoped>
.container__preloader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .preloader {
    width: 10rem;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    animation: loading 1.5s linear infinite;
    @keyframes loading {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
    & > * {
      transform: scale(2, 2);
    }
    .circle {
      border-radius: 50%;
      border-width: 0;
      position: absolute;
      &.outer {
        width: 3rem;
        height: 3rem;
        background: conic-gradient(#000 0 5%, transparent 75%);
        .spinner {
          width: 0.25rem;
          height: 0.25rem;
          background-color: #000;
          margin: 0 auto;
          border-radius: 50%;
        }
      }
      &.inner {
        width: 2.5rem;
        height: 2.5rem;
        background-color: peachpuff;
      }
    }
  }
}
</style>