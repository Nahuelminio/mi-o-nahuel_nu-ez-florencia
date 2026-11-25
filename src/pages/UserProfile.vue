<script>
import BaseH1 from "../components/BaseH1.vue";
import { getUserProfileById } from "../services/user-profiles.js";

export default {
  name: "UserProfile",
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
        photo_url: null,
      },
    };
  },
  async mounted() {
    try {
        this.loading = true;
        this.user = await getUserProfileById(this.$route.params.id);
    } catch (error) {
      console.error("Error al traer el perfil del usuario", error);
    }
  },
};
</script>

<template>
  <BaseH1 class="text-white">Perfil de usuario</BaseH1>
  <section
    class="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-neutral-200"
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
    <p class="mt-4 text-neutral-700">
      {{ user.bio ?? "Este usuario todavía no escribió una bio." }}
    </p>
  </section>
</template>
