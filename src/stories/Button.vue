<template>
  <v-btn
          v-if="props.value"
          rounded="lg"
          color="default"
          :loading="Boolean(loading)"
          size="large">{{ value }}
  </v-btn>
  <v-btn v-else icon="" :class="icon" variant="text">
  </v-btn>
</template>

<script setup lang="ts">

interface buttonComponentProps {
  value?: string;
  loading?: boolean;
  icon?: string;
}

const props = defineProps<buttonComponentProps>();
</script>