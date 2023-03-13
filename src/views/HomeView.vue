<script setup>
import Card from '../components/Card.vue';
import q from '../data/quizes.json';
import { ref, watch } from 'vue';
const quizes = ref(q);
const search = ref('');

watch(search, () => {
  quizes.value = q.filter((quiz) =>
    quiz.stack.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div class="flex justify-center mx-auto max-w-[1000px]">
    <div class="p-3 flex flex-col">
      <header class="flex flex-col items-center mt-10 mb-5">
        <h1 class="text-xl">Tech Quiz</h1>
        <div
          class="w-[250px] relative flex items-center mt-5 rounded-md border justify-center bg-[aliceblue]"
        >
          <input
            v-model.trim="search"
            type="text"
            placeholder="Search..."
            class="py-3 px-2 w-[250px] min-w-[200px] border-none bg-[aliceblue]"
          />
          <div
            class="material-symbols-outlined bg-transparent absolute right-0"
          >
            search
          </div>
        </div>
      </header>
      <div class="flex justify-center flex-wrap mt-8">
        <Card v-for="quiz in quizes" :key="quiz.id" :quiz="quiz" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .header {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 30px;
  margin-bottom: 20px;
} */
header h1 {
  font-family: sans-serif;
}
/* header input {
  border-radius: 5px;
  border: none;
  background-color: aliceblue;
  padding: 0 0.5rem;
} */
.card-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;

  gap: 1rem;
}
</style>
