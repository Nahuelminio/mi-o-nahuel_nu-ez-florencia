<script>
import BaseH1 from "../components/BaseH1.vue";
import { login } from "../services/auth.js";

export default {
  name: "Login",
  components: {
    BaseH1,
  },
    data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods:{
    async handleSubmit(){
        try {
            this.loading = true;
            await login(this.user.email, this.user.password);
            alert("Usuario logueado correctamente.");
            this.$router.push("/chat");


        } catch (error) {
            alert(error.message);
        } 
        this.loading = false;
    },
  }
};
</script>

<template>
  <BaseH1>Login</BaseH1>
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
      Iniciar sesión
    </button>
  </form>
</template>
