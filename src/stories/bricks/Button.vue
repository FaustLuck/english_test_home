<template>
  <template v-if="props.value">
    <v-btn
            rounded="lg"
            elevation="5"
            :loading="Boolean(loading)"
            size="large">{{ value }}
    </v-btn>
  </template>
</template>

<script setup lang="ts">

interface buttonComponentProps {
  value?: string;
  loading?: boolean;
  icon?: string;
}

const props = defineProps<buttonComponentProps>();
</script>