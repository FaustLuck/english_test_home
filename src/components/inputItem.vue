<template>
  <input :type="type==='number'?'number':'text'" v-model="localValue" @input="validate">
</template>

<script>
export default {
  name: "inputItem",
  props: {
    type: String,
    value: {
      type: [String, Number],
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
      if (this.type === "number") return;
      const value = e.target.value;
      const regexp = /[^a-zа-яё,.?!\s]/ig;
      this.localValue = value.replace(regexp, "");
      this.$emit("changes", {type: this.type, newValue: this.localValue});
    },
  }
};
</script>

<style scoped lang="scss">
</style>