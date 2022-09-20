<template>
  <div class="user"
       :class="{privileged:user.info.isPrivileged}"
       @click="$emit('changeActiveUser',uid)">
      <span class="user__avatar">
        <img :src="user.info.photoURL" :alt="user.info.displayName">
      </span>
    <span class="user__name">{{ user.info.displayName }}</span>
  </div>
</template>

<script>
export default {
  name: "userCardComponent",
  props: {
    user: Object,
    uid: String
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

  &__name {
    text-align: center;
  }
}
</style>