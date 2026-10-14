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
  <BaseH1>Mi Perfil</BaseH1>
  <div>{{ user.display_name ?? 'Sin nombre de pantalla' }}</div>
  <p>{{ user.email ?? 'Sin especificar' }}</p>
</template>
