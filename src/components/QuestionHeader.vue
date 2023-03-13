<script setup>
const { questionStatus, barPercentage } = defineProps([
  'questionStatus',
  'barPercentage',
]);
</script>
<template>
  <header>
    <h3 class="text-xl font-bold">Question {{ questionStatus }}</h3>

    <div class="mt-4 mb-10 h-12 w-[300px] border border-cyan-500">
      <div
        class="h-full w-0 bg-gradient-to-r from-cyan-500 to-blue-500 flex"
        :style="{ width: barPercentage }"
      ></div>
    </div>
  </header>
</template>
