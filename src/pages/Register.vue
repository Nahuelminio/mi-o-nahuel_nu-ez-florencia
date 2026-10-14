<script>
import BaseH1 from "../components/BaseH1.vue";
import { register } from "../services/auth.js";

export default {
  name: "Register",
  components: {
    BaseH1,
  },
  data() {
    return {
        user: {
          email: "",
          password: "",
          display_name: "",
      },
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        await register(
          this.user.email,
          this.user.password,
          this.user.display_name,
        );
        alert(
          "Usuario creado correctamente. Revisa tu correo para verificar tu cuenta.",
        );
        this.$router.push("/chat");
      } catch (error) {
        alert(error.message);
      }
      this.loading = false;
    },
  },
};
</script>
<template>
  <section class="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-neutral-200">
  <BaseH1>Crear cuenta</BaseH1>
  <form action="#" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block mb-1" for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Escribe tu email"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="user.email"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="display_name">Nombre</label>
      <input
        type="text"
        id="display_name"
        placeholder="Tu nombre"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="user.display_name"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        placeholder="Escribe tu password"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="user.password"
      />
    </div>
    <button
      class="w-full rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors"
      type="submit"
    >
      Crear cuenta
    </button>
  </form>
  </section>
</template>
