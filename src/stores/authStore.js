import { defineStore } from 'pinia';
import { getCurrentUser, updateVIP } from '../superbase/util';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    isVIP: false,
  }),
  actions: {
    setUser(userAuth) {
      this.user = userAuth;
    },
    setVIP(value) {
      this.isVIP = value;
    },
    async toggleVIP() {
      this.isVIP = !this.isVIP;
      // await updateVIP(this.isVIP);
      const user = await getCurrentUser();
      if (user) {
        // console.log(user.user_metadata.VIP);
        user.user_metadata.VIP = this.isVIP;
        console.log(user.user_metadata.VIP);
        localStorage.setItem('VIP', this.isVIP);
      }
    },
  },
});
