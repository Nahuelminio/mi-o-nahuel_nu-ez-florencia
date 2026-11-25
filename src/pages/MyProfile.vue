<script>
import BaseH1 from "../components/BaseH1.vue";
import { subscribeToAuthChanges } from "../services/auth.js";

export default {
  name: "MyProfile",
  components: {
    BaseH1,
  },
  data() {
    return {
      user: {
        id: null,
        email: null,
        bio: null,
        display_name: null,
      },
    };
  },
  mounted() {
    subscribeToAuthChanges((userData) => (this.user = userData));
  },
};
</script>
<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
    <BaseH1 class="text-white !mb-0">Mi perfil</BaseH1>
    <div class="flex gap-2">
    <RouterLink to="/mi-perfil/editar" class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 transition-colors"
      >Editar</RouterLink>
    <RouterLink to="/mi-perfil/editar/foto" class="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      >Cambiar foto</RouterLink>
  </div>
  </div>
  <section
    class=" mt-6 max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-neutral-200"
  >
    <div class="flex items-center gap-4">
      <img
        v-if="user.photo_url"
        :src="user.photo_url"
        alt="Foto de perfil"
        class="size-16 rounded-full object-cover"
      />
      <span
        v-else
        aria-hidden="true"
        class="flex items-center justify-center size-16 rounded-full bg-neutral-900 text-2xl font-semibold text-white uppercase"
      >
        {{ user.display_name?.charAt(0) ?? "?" }}
      </span>
      <div>
        <p class="text-xl font-semibold">
          {{ user.display_name ?? "Sin nombre de pantalla" }}
        </p>
        <p class="text-neutral-500">{{ user.email ?? "Sin especificar" }}</p>
      </div>
    </div>
  </section>
  </div>
</template>
