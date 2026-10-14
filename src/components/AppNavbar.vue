
<script>
import { logout, subscribeToAuthChanges } from "../services/auth.js";

export default {
  name: "AppNavbar",
  data() {
    return {
      user: { id: null, email: null },
    };
  },
  methods: {
    async handleLogout() {
      await logout();
      this.$router.push("/ingresar");
    },
  },
  mounted() {
    subscribeToAuthChanges((userData) => (this.user = userData));
  },
};
</script>
<template>
  <nav class="flex items-center h-15 bg-slate-600 text-white gap-8 p-4">
    <RouterLink to="/" class="text-xl font-bold tracking-widest">ORVEN</RouterLink>
    <ul class="flex gap-4">
      <li class="">
        <RouterLink class="" to="/">Inicio</RouterLink>
      </li>
      <template v-if="user.id !== null">
        <li class="">
          <RouterLink class="" to="/chat">Chat</RouterLink>
        </li>
        <li class="">
          <RouterLink class="" to="/mi-perfil">Mi perfil</RouterLink>
        </li>
        <li class="">
          <form action="#" @submit.prevent="handleLogout">
            <button type="submit" >
             {{ user.email }} (Cerrar sesión)
            </button>
          </form>
        </li>
      </template>
      <template v-else>
        <li class="">
          <RouterLink class="" to="/ingresar">Ingresar</RouterLink>
        </li>
        <li class="">
          <RouterLink class="" to="/crear-cuenta">Crear cuenta</RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>