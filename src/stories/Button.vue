<template>
  <v-btn
          v-if="props.value"
          rounded="lg"
          :loading="Boolean(loading)"
          size="large">{{ value }}
  </v-btn>
  <v-btn v-else icon="" variant="text">
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">

interface buttonComponentProps {
  value?: string;
  loading?: boolean;
}

const props = defineProps<buttonComponentProps>();
</script>