<script setup>
import { useRouter } from 'vue-router';
const { quiz } = defineProps(['quiz']);
const router = useRouter();
const navigateToCertainStack = () => {
  router.push(`./stack/${quiz.id} `);
};
</script>
<template>
  <div @click="navigateToCertainStack" class="card">
    <img :src="quiz.img" :alt="quiz.stack" />
    <div class="description">
      <h2 class="flex items-center">
        {{ quiz.stack }}
      </h2>
      <p>{{ quiz.questions.length }} quesions</p>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 310px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.card img {
  width: 100%;
  height: 200px;
  margin: 0;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.75rem;
}
.description h2 {
  font-family: sans-serif;
  font-weight: bold;
}
</style>
