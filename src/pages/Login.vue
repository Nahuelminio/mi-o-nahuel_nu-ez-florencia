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
      errorMessage: "",
    };
  },
  methods:{
    async handleSubmit(){
        this.errorMessage = "";
        try {
            this.loading = true;
            await login(this.user.email, this.user.password);
            this.$router.push("/");
        } catch (error) {
            this.errorMessage = error.message;
        }
        this.loading = false;
    },
  }
};
</script>

<template>
  
  <section class="max-w-md mx-auto mt-10  p-8 bg-white rounded-xl shadow-2xl border border-neutral-200">
  <BaseH1>Iniciar sesion</BaseH1>
  <p v-if="errorMessage" class="mb-4 text-sm text-red-600" role="alert">
    {{ errorMessage }}
  </p>
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
      type="submit">
      Iniciar sesión
    </button>
  </form>
  </section>

</template>
