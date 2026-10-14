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
  <BaseH1>Register</BaseH1>
  <form action="#" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block mb-1" for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Escribe tu email"
        class="border rounded p-2 w-full"
        v-model="user.email"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="display_name">Nombre</label>
      <input
        type="text"
        id="display_name"
        placeholder="Tu nombre"
        class="border rounded p-2 w-full"
        v-model="user.display_name"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        placeholder="Escribe tu password"
        class="border rounded p-2 w-full"
        v-model="user.password"
      />
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      type="submit"
    >
      Crear cuenta
    </button>
  </form>
</template>
