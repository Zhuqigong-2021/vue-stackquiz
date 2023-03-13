<script setup>
const { answer } = defineProps(['answer']);
console.log(answer);
</script>

<template lang="">
  <div>Answer:{{ answer }}</div>
</template>
