<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { supabase } from '../superbase/superbase';
import IconGoogle from '~icons/bi/google';
import IconGithub from '~icons/mdi/github';
import IconDiscord from '~icons/bi/discord';

const email = ref(null);
const password = ref(null);
const router = useRouter();
const errorMsg = ref(null);
const isFormValid = computed(() => {
  return email.value !== null && password.value !== null;
});
const login = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push('/');
  } catch (error) {
    errorMsg.value = `Error:${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    router.push('/');
  } catch (error) {
    errorMsg.value = `Error:${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
async function signInWithGitHub() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
    router.push('/');
  } catch (error) {
    errorMsg.value = `Error:${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}

async function signInWithDiscord() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    if (error) throw error;
    router.push('/');
  } catch (error) {
    errorMsg.value = `Error:${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}
</script>

<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Register -->

    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-gray-100 rounded-md shadow-lg"
    >
      <h1 class="text-3xl mb-10">Log in</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm">Email</label>
        <input
          type="text"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="email"
          v-model="email"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm">Password</label>
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="password"
          v-model="password"
        />
      </div>

      <RouterLink class="text-sm mt-2" to="/register">
        Do not have an account? <span class="text-cyan-500">Register</span>
      </RouterLink>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm disabled:opacity-50 text-sm text-white duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 disabled:bg-slate-500"
        :disabled="!isFormValid"
      >
        Log in
      </button>

      <div class="flex flex-col mt-10">
        <p class="">social media</p>
        <button
          @click="signInWithGoogle"
          type="button"
          class="mt-6 py-2 px-6 flex items-center justify-center rounded-sm text-sm text-white duration-200 bg-gradient-to-r from-red-500 to-amber-400"
        >
          <IconGoogle class="mr-2" /> Google
        </button>
        <button
          @click="signInWithGitHub"
          type="button"
          class="mt-6 py-2 px-6 flex items-center justify-center rounded-sm text-sm text-white duration-200 bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <IconGithub class="scale-[1.3] mr-2" /> Github
        </button>
        <button
          @click="signInWithDiscord"
          type="button"
          class="mt-6 py-2 px-6 flex items-center justify-center rounded-sm text-sm text-white duration-200 bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          <IconDiscord class="mr-2" /> Discord
        </button>
      </div>
    </form>
  </div>
</template>
