<script setup>
const emit = defineEmits(['selectOption']);
const { question } = defineProps(['question']);
const emitSelectedOption = (isCorrect) => {
  emit('selectOption', isCorrect);
};
</script>

<template>
  <div>
    <div class="mt-10">
      <h1 class="text-2xl font-bold mb-8">{{ question.text }}</h1>
    </div>
    <div class="options-container">
      <div
        v-for="option in question.options"
        class="cursor-pointer flex mb-4"
        @click="emitSelectedOption(option.isCorrect)"
      >
        <p
          class="bg-gradient-to-r from-cyan-500 to-blue-500 w-[50px] h-[50px] text-white justify-center text-[30px] flex"
        >
          {{ option.label }}
        </p>
        <div class="bg-cyan-100 flex items-center w-full px-2">
          <p>{{ option.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option {
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
}
.option-label {
  background-color: rgb(2, 114, 80);
  width: 50px;
  height: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.option-value {
  background-color: rgb(186, 243, 238);
  width: 100%;
  font-size: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
