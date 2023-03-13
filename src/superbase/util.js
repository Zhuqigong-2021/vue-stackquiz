import { supabase } from './superbase';
export const updateVIP = async (value) => {
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const { user } = await supabase.auth.update({
    user_metadata: { VIP: value },
  });
  // authStore.setVIP(user.user_metadata.VIP);
  if (!user) {
    appReady.value = true;
  }
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  return user;
};
