<template>
  <v-btn rounded="lg" x-large :loading="Boolean(loading)">{{ value }}</v-btn>
</template>

<script setup lang="ts">
export interface buttonComponentProps {
  value: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<buttonComponentProps>(), {
  loading: false
});
</script>