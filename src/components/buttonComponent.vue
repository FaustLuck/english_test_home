<template>
  <input
    type="button"
    :value="value"
    :disabled="isLoading"/>
</template>

<script>
import { mapState } from "pinia";
import { mainStore } from "@/store/mainStore";

export default {
  name: "buttonComponent",
  props: {
    value: {type: String, required: true}
  },
  computed: {
    ...mapState(mainStore, ["isLoading"]),
  }
};
</script>

<style scoped lang="scss">
input[type="button"] {
  font-size: 2rem;
  padding: 0 0.5rem;
  font-family: "serif";
  border-radius: .5rem;
  cursor: pointer;
  box-shadow: 0 0 10px 2px #e9a66a;
  outline: none;
  border-color: #e9a66a;
  background-color: transparent;
  margin: 3px;

  &:active {
    box-shadow: none;
    outline: 1px solid black;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
}
</style>