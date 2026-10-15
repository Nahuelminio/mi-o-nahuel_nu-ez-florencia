<script>
import BaseH1 from "../components/BaseH1.vue";
import { subscribeToAuthChanges } from "../services/auth.js";

export default {
  name: "MyProfile",
  components: {
    BaseH1
  },
  data(){
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
    subscribeToAuthChanges(userData => this.user = userData);
  },
};
</script>
<template>
  <section class="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-neutral-200">
  <BaseH1>Mi perfil</BaseH1>
  <div class="flex items-center gap-4">
  <span aria-hidden="true" class="flex items-center justify-center size-16 rounded-full bg-neutral-900 text-2xl font-semibold text-white uppercase">
  {{  user.display_name?.charAt(0) ?? "?" }}
  </span>
  <div>
  <p class="text-xl font-semibold">{{ user.display_name ?? 'Sin nombre de pantalla' }}</p>
  <p class="text-neutral-500">{{ user.email ?? 'Sin especificar' }}</p>
  </div>
  </div>
</section>
</template>
