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
  <BaseH1 class="text-white">Cambiar foto de perfil</BaseH1>
  <form action="#" @submit.prevent="handleSubmit">
    <input type="file" @change="handlePhotoChange" />
    <button type="submit" :disabled="loading">
      {{ loading ? "Cargando..." : "Guardar cambios" }}
    </button>
  </form>
  <div>
    <img
      v-if="photo.preview"
      :src="photo.preview"
      alt="Vista previa de la foto"
    />
    <p v-else>No hay imagen seleccionada</p>
  </div>
</template>
