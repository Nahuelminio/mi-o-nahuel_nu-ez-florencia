<script>
import AppNavbar from "./components/AppNavbar.vue";
export default {
  name: "App",
  components: {
    AppNavbar,
  },

};
</script>

<template>
<AppNavbar />
  <main class="container py-5 mx-auto">
    <RouterView />
  </main>
  <footer class="flex justify-center items-center h-25 bg-gray-800 text-white">
    <p>Orven &mdash; Opiniones sobre relojes &copy; 2026 &middot; Da Vinci</p>
  </footer>
</template>
