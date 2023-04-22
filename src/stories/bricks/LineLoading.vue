<template>
  <v-label class="glow-text ma-1">Loading... Loading...</v-label>
</template>

<style scoped lang="scss">
.glow-text {
    animation: glow 1.5s ease-in-out infinite;
    background: linear-gradient(90deg, transparent 10%, rgb(0, 0, 0), transparent 90%);
    color: transparent;
    user-select: none;
    border-radius: 8px;
}

@keyframes glow {
    from, to {
        opacity: .5;
    }
    50% {
        opacity: 0;
    }
}
</style>