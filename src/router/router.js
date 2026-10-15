import { createRouter, createWebHistory } from "vue-router";
import PublicChat from "../pages/PublicChat.vue";
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import MyProfile from "../pages/MyProfile.vue";
import { subscribeToAuthChanges } from "../services/auth.js";

const routes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/ingresar",
    component: Login,
  },
  {
    path: "/crear-cuenta",
    component: Register,
  },
  {
    path: "/chat",
    component: PublicChat,
    meta: { requiresAuth: true },
  },
  {
    path: "/mi-perfil",
    component: MyProfile,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

let user = {
  id: null,
  email: null,
};
subscribeToAuthChanges((userData) => (user = userData));

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && user.id === null) {
    return { path: "/ingresar" };
  }
});

export default router;
