<script>
import BaseH1 from "../components/BaseH1.vue";
import { getPosts, createPost } from "../services/posts.js";
import { subscribeToAuthChanges } from "../services/auth.js";

export default {
  name: "Home",
  components: {
    BaseH1,
  },
  data() {
    return {
      posts: [],
      newPost: { body: "" },
      user: { id: null },
    };
  },
  methods: {
    async handleCreatePost() {
      await createPost({ user_id: this.user.id, body: this.newPost.body });
      this.newPost.body = "";
      this.posts = await getPosts();
    },
  },
  async mounted() {
    this.posts = await getPosts();
    subscribeToAuthChanges((userData) => (this.user = userData));
  },
};
</script>
<template>
  <div class="max-w-2xl mx-auto">
    <BaseH1 class="text-white">Últimas opiniones</BaseH1>
    <section
      v-if="user.id"
      class="mb-8 p-6 bg-white rounded-xl shadow-sm border border-neutral-200"
    >
      <h2 class="mb-4 text-lg font-semibold">Compartí tu opinión</h2>
      <form action="#" @submit.prevent="handleCreatePost">
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-neutral-700"
            for="body"
            >¿Qué reloj querés comentar?</label
          >
          <textarea
            id="body"
            class="w-full min-h-24 resize-y rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            placeholder="Escribí tu opinión sobre un reloj"
            v-model="newPost.body"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            class="rounded-lg bg-neutral-900 px-5 py-2 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors"
            type="submit"
          >
            Opinar
          </button>
        </div>
      </form>
    </section>

    <section>
      <h2 class="sr-only">Opiniones sobre relojes</h2>
      <ol>
        <li
          v-for="post in posts"
          :key="post.id"
          class="mb-4 p-6 bg-white rounded-xl shadow-sm border border-neutral-200"
        >
          <p class="text-sm text-neutral-500">
            {{ post.user_profiles?.display_name ?? "Anónimo" }} —
            {{ new Date(post.created_at).toLocaleString() }}
          </p>
          <p>{{ post.body }}</p>
        </li>
      </ol>
    </section>
  </div>
</template>
