
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
  <header>
  <nav aria-label="Navegación Principal" class="flex items-center gap-8 h-15 px-6 bg-neutral-900 text-white">
    <RouterLink to="/" class="text-xl font-bold tracking-[0.3em]">ORVEN</RouterLink>
    <ul class="flex items-center gap-6 text-sm">
      <li class="">
        <RouterLink class="text-neutral-300 hover:text-white transition-colors" to="/">Inicio</RouterLink>
      </li>
      <template v-if="user.id !== null">
        <li class="">
          <RouterLink class="text-neutral-300 hover:text-white transition-colors" to="/chat">Chat</RouterLink>
        </li>
        <li class="">
          <RouterLink class="text-neutral-300 hover:text-white transition-colors" to="/mi-perfil">{{ user.display_name }} (Mi perfil)</RouterLink>
        </li>
        <li class="">
          <form action="#" @submit.prevent="handleLogout">
            <button type="submit" >
             Cerrar sesión
            </button>
          </form>
        </li>
      </template>
      <template v-else>
        <li class="">
          <RouterLink class="text-neutral-300 hover:text-white transition-colors" to="/ingresar">Ingresar</RouterLink>
        </li>
        <li class="">
          <RouterLink class="text-neutral-300 hover:text-white transition-colors" to="/crear-cuenta">Crear cuenta</RouterLink>
        </li>
      </template>
    </ul>
  </nav>
  </header>
</template>