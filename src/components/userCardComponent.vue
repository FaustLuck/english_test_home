<template>
  <div class="user"
       :class="{privileged:user?.privileged}"
       @click="$emit('changeActiveUser',user.sub)">
      <span class="user__avatar">
        <img :src="user.picture" :alt="user.name">
      </span>
    <span class="user__name">{{ user.name }}</span>
  </div>
</template>

<script>
export default {
  name: "userCardComponent",
  props: {
    user: Object,
  }
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
  height: 7rem;
  border-radius: 2rem;
  box-shadow: 0 0 10px 5px #e9a66a;
  margin: 1rem;
  padding: .5rem;
  background-color: #FFDAB9;
  text-overflow: clip;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    margin: 1rem 0;
    height: 5rem;
  }

  @media screen and (max-width: 768px) {
    margin: .5rem 0;
    height: 3rem;
  }

  &.privileged {
    order: -1;
  }

  &__avatar {
    margin: .5rem;
    height: 100%;

    & > img {
      height: 100%;
      width: auto;
      border-radius: 50%;
    }
  }
}
</style>