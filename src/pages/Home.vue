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
  <BaseH1>Últimas opiniones</BaseH1>

  <section>
    <h2 class="sr-only">Opiniones sobre relojes</h2>
    <ol>
      <li v-for="post in posts" :key="post.id" class="mb-4 border-b pb-2">
        <p class="text-sm text-gray-500">
          {{ post.user_profiles?.display_name ?? "Anónimo" }} —
          {{ new Date(post.created_at).toLocaleString() }}
        </p>
        <p>{{ post.body }}</p>
      </li>
    </ol>
  </section>

  <section v-if="user.id" class="mt-6">
    <h2 class="mb-4">Compartí tu opinión</h2>
    <form action="#" @submit.prevent="handleCreatePost">
      <div class="mb-4">
        <label class="block mb-1" for="body">¿Qué reloj querés comentar?</label>
        <textarea
          id="body"
          class="border rounded p-2 w-full"
          placeholder="Escribí tu opinión sobre un reloj"
          v-model="newPost.body"
        ></textarea>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Opinar
      </button>
    </form>
  </section>
</template>
