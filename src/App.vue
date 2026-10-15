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

  <div
    aria-hidden="true"
    class="fixed inset-0 -z-10 bg-linear-to-br from-neutral-900 via-neutral-700 to-neutral-400"
  ></div>
  <div
    aria-hidden="true"
    class="fixed inset-0 -z-10 [background-size:40px_40px] [background-image:linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
  ></div>
  <main class="container mx-auto px-4 py-8">
    <RouterView />
  </main>
  <footer
    class="flex justify-center items-center bg-neutral-900 text-neutral-400 text-sm"
  >
    <p>Orven &mdash; Opiniones sobre relojes &copy; 2026 &middot; Da Vinci</p>
  </footer>
</template>
