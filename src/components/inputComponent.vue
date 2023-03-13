<template>
  <input type="text" v-model="localValue" @input="validate">
</template>

<script>
export default {
  name: "inputComponent",
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
      this.localValue = val;
    }
  },
  methods: {
    validate(e) {
      let value = e.target.value;
      const regexp = /[^a-zа-яё,.?!\s]/ig;
      value = value.replace(regexp, "");
      if (value && value[0].toUpperCase() !== value[0]) value = this.capitalize(value);
      this.localValue = value;
      this.$emit("changes", {type: this.type, newValue: this.localValue});
    },
    capitalize(value) {
      return value[0].toUpperCase() + value.substring(1, value.length);
    }
  }
};
</script>

<style scoped lang="scss">
input[type="text"] {
  font-size: 2.5rem;
  font-family: "serif";
  background-color: transparent;
  width: 50%;
  border: none;
  outline: 1px solid black;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
}
</style>