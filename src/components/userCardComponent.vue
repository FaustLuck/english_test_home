<template>
  <div class="user"
       :class="{privileged:user.info.isPrivileged}"
       @click="()=>this.$emit('changeActiveUser',user.info.displayName)">
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
    user: Object
  }
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  align-items: center;
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


    & > img {
      height: 100%;
      border-radius: 50%;
    }
  }

  &__name {
    text-align: center;
  }
}
</style>