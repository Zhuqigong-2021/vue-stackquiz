<script setup>
import { ref, computed, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { supabase } from '../superbase/superbase';

const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
const router = useRouter();
const isFormValid = computed(() => {
  return (
    email.value !== null &&
    password.value !== null &&
    confirmPassword.value !== null
  );
});

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'password not match';
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  } else {
    try {
      let { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            VIP: false,
          },
        },
      });
      // console.log(data);

      const { data } = await supabase
        .from('user')
        .insert({ user_name: email.value, VIP: false });
      if (error) throw error;
      router.push('/login');
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
};
</script>

<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <!-- Register -->
    <form
      @submit.prevent="register"
      class="p-8 flex flex-col bg-gray-100 rounded-md shadow-lg"
    >
      <h1 class="text-3xl mb-10">Register</h1>

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

      <div class="flex flex-col mb-2">
        <label for="confirmPassword" class="mb-1 text-sm"
          >Confirm Password</label
        >
        <input
          type="password"
          required
          class="p-2 text-gray-500 focus:outline-none"
          id="confirmPassword"
          v-model="confirmPassword"
        />
      </div>
      <RouterLink class="text-sm mt-2" to="/login">
        Already have an account? <span class="text-cyan-500">Login</span>
      </RouterLink>

      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm disabled:opacity-50 text-sm text-white duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 disabled:bg-slate-500"
        :disabled="!isFormValid"
      >
        Register
      </button>
    </form>
  </div>
</template>
