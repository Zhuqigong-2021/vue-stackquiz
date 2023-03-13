<script setup>
import Question from '../components/Question.vue';
import QuestionHeader from '../components/QuestionHeader.vue';
import Result from '../components/Result.vue';
import quizes from '../data/quizes.json';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import AnswerView from './AnswerView.vue';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const authStore = useAuthStore();
const stackId = parseInt(route.params.id);
const [stack] = quizes.filter((quiz) => quiz.id === stackId);
const isOpen = ref(false);
const isVIPValid = computed(() => authStore.isVIP);
const currentQuestionIndex = ref(0);
const showResult = ref(false);
const numberOfCorrect = ref(0);
const numberOfQuestion = stack.questions.length;
const questionStatus = computed(
  () => `${currentQuestionIndex.value} / ${numberOfQuestion}`
);
const barPercentage = computed(
  () => `${(currentQuestionIndex.value / numberOfQuestion) * 100}%`
);
const finalResult = computed(
  () => `${numberOfCorrect.value}/ ${numberOfQuestion}`
);

const moveToNext = () => {
  // if (!isCorrect) return;
  if (currentQuestionIndex.value + 1 >= numberOfQuestion) {
    // currentQuestionIndex.value++;
    showResult.value = true;
  }
  console.log(currentQuestionIndex.value);
  currentQuestionIndex.value++;
  isOpen.value = false;
};
const checkAnswer = () => {
  // router.push(`/stack/${stackId}/answer`);
  if (localStorage.getItem('VIP') === 'true') {
    isOpen.value = !isOpen.value;
  }
  if (currentQuestionIndex.value - 1 >= numberOfQuestion) {
    return;
  }
};
const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    numberOfCorrect.value++;
  }
  moveToNext();

  // currentQuestionIndex.value++;
};
</script>

<template>
  <div class="max-w-[1000px] mx-auto my-10 px-8">
    <QuestionHeader
      :questionStatus="questionStatus"
      :barPercentage="barPercentage"
    />
    <div v-if="!showResult">
      <Question
        :question="stack.questions[currentQuestionIndex]"
        @selectOption="onOptionSelected"
      />
    </div>

    <Result v-else :finalResult="finalResult" />
    <div class="flex justify-between">
      <button
        v-show="!showResult"
        @click="moveToNext"
        class="next bg-gradient-to-r from-cyan-500 to-blue-500 flex"
      >
        next question
      </button>
      <button
        v-show="!showResult"
        @click="checkAnswer"
        class="next bg-gradient-to-r disabled:opacity-50 from-violet-500 to-fuchsia-500 flex items-center"
        :disabled="!isVIPValid"
      >
        check anwser
        <span
          class="material-symbols-outlined text-amber-400 font-black flex items-center ml-1"
        >
          diamond
        </span>
      </button>
    </div>

    <AnswerView
      v-if="isOpen"
      class="mt-10"
      :answer="stack.questions[currentQuestionIndex].anwser"
    />
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 1000px;
  margin: 2rem auto;
}
</style>
