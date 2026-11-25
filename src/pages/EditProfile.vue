<script>
import BaseH1 from "../components/BaseH1.vue";
import {
  updateAuthuserProfile,
  updateAuthUserPassword,
  subscribeToAuthChanges,
} from "../services/auth.js";

export default {
  name: "EditProfile",
  components: {
    BaseH1,
  },
  data() {
    return {
      profile: {
        id: "",
        email: "",
        bio: "",
        display_name: "",
      },
      updating: false,
      password: "",
      updatingPassword: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.updating = true;
        await updateAuthuserProfile({...this.profile});
      } catch (error) {
        console.error("Error al actualizar el perfil", error);
      } finally {
        this.updating = false;
      }
    },
    async handleUpdatePassword() {
      try {
        this.updatingPassword = true;
        await updateAuthUserPassword(this.password);
        this.password = "";
      } catch (error) {
        console.error("Error al actualizar la contraseña", error);
      } finally {
        this.updatingPassword = false;
      }
    },
  },
  mounted() {
   subscribeToAuthChanges(userData => {
      this.profile = {
        bio:userData.bio,
        display_name:userData.display_name,
        email:userData.email,
      }
    });
}
}
</script>

<template>
  <BaseH1 class="text-white">Editar perfil</BaseH1>
  <form action="#" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block mb-1" for="display_name">Nombre de pantalla</label>
      <input
        type="text"
        id="display_name"
        placeholder="Escribe tu nombre de pantalla"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="profile.display_name"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Tu email"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-neutral-100 text-neutral-500"
        v-model="profile.email"
        readonly
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1" for="bio">Biografía</label>
      <textarea
        id="bio"
        rows="4"
        placeholder="Escribe algo sobre vos"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="profile.bio"
      ></textarea>
    </div>
    <button
      type="submit"
      class="rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 disabled:opacity-50"
      :disabled="updating"
    >
      Guardar cambios
    </button>
  </form>

  <h2 class="mt-8 mb-4 text-xl font-semibold text-white">Cambiar contraseña</h2>
  <form action="#" @submit.prevent="handleUpdatePassword">
    <div class="mb-4">
      <label class="block mb-1" for="password">Nueva contraseña</label>
      <input
        type="password"
        id="password"
        placeholder="Escribe tu nueva contraseña"
        class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="password"
        minlength="6"
        required
      />
    </div>
    <button
      type="submit"
      class="rounded-lg bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 disabled:opacity-50"
      :disabled="updatingPassword"
    >
      Actualizar contraseña
    </button>
  </form>
</template>
