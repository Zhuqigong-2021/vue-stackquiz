import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StackView from '../views/StackView.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AnswerView from '../views/AnswerView.vue';
import { supabase } from '../superbase/superbase';

const router = createRouter({
  history: createWebHistory(import.meta.env.Base_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        requireAuth: true,
      },
    },
    {
      path: '/home',
      redirect: '/',
      meta: {
        title: 'Home',
        requireAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: 'Register',
        requireAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
        requireAuth: false,
      },
    },
    {
      path: '/stack/:id',
      name: 'stack',
      component: StackView,
      // children: [
      //   {
      //     path: 'answer',
      //     component: AnswerView,
      //   },
      // ],
      meta: {
        title: 'Stack',
        requireAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Phil Tech`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (user) {
      next();
    } else {
      alert(" you don't log in ");
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
