<template>
	{{ day }}
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps<{ sub: string, day: string }>();

onMounted(()=>{

})
</script>
