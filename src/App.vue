<script setup>
import Nav from './components/Nav.vue';
import { useAuthStore } from './stores/authStore';
import { ref, computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { supabase } from './superbase/superbase';

const authStore = useAuthStore();
const router = useRouter();
const appReady = ref(null);
const checkUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    // authStore.setVIP(user.user_metadata.VIP);
    // console.log(localStorage.getItem('VIP'));
    // authStore.setVIP();
  }

  if (!user) {
    appReady.value = true;
  }
};
checkUser();
supabase.auth.onAuthStateChange((_, session) => {
  if (!session) {
    router.push('/login');
  }
  let isVip = computed(() => localStorage.getItem('VIP'));
  let boolValue = /true/i.test(isVip.value);

  authStore.setUser(session);
  authStore.setVIP(boolValue);
  appReady.value = true;
});
</script>

<template>
  <div v-if="appReady">
    <Nav />
    <!-- v-if="appReady" -->

    <RouterView />
  </div>
</template>
