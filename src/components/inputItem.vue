<template>
  <input type="text" v-model="localValue" @input="validate">
</template>

<script>
export default {
  name: "inputItem",
  props: {
    type: String,
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localValue: this.value
    };
  },
  watch: {
    value(val) {
    if (val) this.localValue = val[0].toUpperCase() + val.substr(1, val.length - 1);
    }
  },
  methods: {
    validate(e) {
      const value = e.target.value;
      const regexp = /[^a-zа-яё,.?!\s]/ig;
      this.localValue = value.replace(regexp, "");
      this.$emit("changes", {type: this.type, newValue: this.localValue});
    },
  }
};
</script>

<style scoped lang="scss">
input[type="text"] {
  font-size: 2.5rem;
  font-family: "serif";
  width: 50%;
  background-color: transparent;
  border: none;
  outline: 1px solid black;
  margin: 3px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

}
</style>