<script>
import BaseH1 from "../components/BaseH1.vue";
import { updateAuthUserPhoto } from "../services/auth.js";

export default {
  name: "EditProfileAvatar",
  components: {
    BaseH1,
  },
  data() {
    return {
      photo: {
        file: null,
        preview: null,
      },
      loading: false,
    };
  },
  methods: {
    handlePhotoChange(event) {
      if (this.photo.preview) {
        URL.revokeObjectURL(this.photo.preview);
      }
      this.photo.file = event.target.files[0];
      this.photo.preview = URL.createObjectURL(this.photo.file);
    },
    async handleSubmit() {
      try {
        this.loading = true;
        await updateAuthUserPhoto(this.photo.file);
      } catch (error) {
        console.error("Error al cambiar la foto de perfil", error);
      } finally {
        this.loading = false;
      }
    },
  },
  unmounted() {
    if (this.photo.preview) {
      URL.revokeObjectURL(this.photo.preview);
    }
  },
};
</script>
<template>
  <div class="max-w-md mx-auto">
  <BaseH1 class="text-white">Cambiar foto de perfil</BaseH1>
  <section class="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-sm border border-neutral-200">
  <form action="#" @submit.prevent="handleSubmit" class="space-y-4">
    <label for="photo" class="block text-sm font-medium text-neutral-700">Elegí una imagen</label>
    <input id="photo" type="file" accept="image/*" @change="handlePhotoChange" class="block w-full text-sm text-neutral-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-neutral-700" />
    <button type="submit" :disabled="loading" class="w-full rounded-lg bg-neutral-900 px-5 py-2 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors disabled:opacity-50">
      {{ loading ? "Cargando..." : "Guardar cambios" }}
    </button>
  </form>
  <div class="order-first flex justify-center">
    <img
      v-if="photo.preview"
      :src="photo.preview"
      alt="Vista previa de la foto"
      class="size-32 rounded-full object-cover border-4 border-neutral-100 shadow-md"
    />
    <p v-else class="flex items-center justify-center size-32 rounded-full border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm text-neutral-500">No hay imagen seleccionada</p>
  </div>
  </section>
  </div>
</template>
