<template>
  <div>
    <v-layout>
      <slot>{{ childComponent}}</slot>
    </v-layout>
  </div>
</template>

<script lang="ts">

export default {
  name: "HelperWrapper",
  props: {
    childComponent: Object
  }
};
</script>