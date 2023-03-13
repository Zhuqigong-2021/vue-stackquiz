<script setup>
const { finalResult } = defineProps(['finalResult']);
</script>

<template>
  <div class="text-2xl font-black">Result:</div>
  <div class="mt-4 text-xl">{{ finalResult }}</div>
</template>
