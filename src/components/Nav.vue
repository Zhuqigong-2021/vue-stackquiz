<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { supabase } from '../superbase/superbase';
import { useAuthStore } from '../stores/authStore';
const router = useRouter();
const authStore = useAuthStore();
// const { user, setUser, setVIP, isVIP } = authStore;
const logout = async () => {
  await supabase.auth.signOut();
  authStore.setUser(null);
  router.push('/login');
};
console.log(authStore.isVIP);
</script>

<template lang="">
  <header class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
    <nav class="py-5 px-16 flex justify-between lg:px-32 sm:flex-row">
      <RouterLink to="/" class="flex items-center">
        <span class="text-3xl mr-1 scale-x-90 translate-y-[-2px] rotate-[65deg]"
          >🔥</span
        >
        <p class="text-xl font-[1000] font-sans">PhilTech</p>
      </RouterLink>
      <!-- <RouterLink to="/register">Sign up </RouterLink> -->
      <div class="flex">
        <RouterLink
          to="/login"
          v-if="!authStore.user"
          class="flex items-center text-xl cursor-pointer"
        >
          Login
        </RouterLink>

        <div v-else class="flex items-center text-xl cursor-pointer">
          <span
            @click="authStore.toggleVIP"
            class="material-symbols-outlined text-white font-black flex items-center mr-4"
            :class="{ active: authStore.isVIP }"
          >
            diamond
          </span>
          <div @click="logout">Logout</div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.active {
  color: rgb(255, 196, 0);
}
</style>
