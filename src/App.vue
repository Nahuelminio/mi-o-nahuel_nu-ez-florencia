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
  <main class="container mx-auto px-4 py-8">
    <RouterView />
  </main>
  <footer class="flex justify-center items-center bg-neutral-900 text-neutral-400 text-sm">
    <p>Orven &mdash; Opiniones sobre relojes &copy; 2026 &middot; Da Vinci</p>
  </footer>
</template>
