<script>
import BaseH1 from "../components/BaseH1.vue";
import PostComments from "../components/PostComments.vue";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  subscribeToPosts,
} from "../services/posts.js";
import { uploadFile, getFileUrl } from "../services/storage.js";
import { subscribeToAuthChanges } from "../services/auth.js";

export default {
  name: "Home",
  components: {
    BaseH1,
    PostComments,
  },
  data() {
    return {
      posts: [],
      newPost: { body: "", file: null, preview: null },
      user: { id: null },
      editingId: null,
      editingBody: "",
      unsubscribeFromPosts: null,
    };
  },
  methods: {
    handlePostImageChange(event) {
      if (this.newPost.preview) {
        URL.revokeObjectURL(this.newPost.preview);
      }
      this.newPost.file = event.target.files[0];
      this.newPost.preview = URL.createObjectURL(this.newPost.file);
    },
    async handleCreatePost() {
      let image_url = null;
      if (this.newPost.file) {
        const filename = `${this.user.id}/${crypto.randomUUID()}.jpg`;
        await uploadFile(filename, this.newPost.file, "post-images");
        image_url = getFileUrl(filename, "post-images");
      }
      await createPost({
        user_id: this.user.id,
        body: this.newPost.body,
        image_url,
      });
      if (this.newPost.preview) {
        URL.revokeObjectURL(this.newPost.preview);
      }
      this.newPost = { body: "", file: null, preview: null };
      this.$refs.fileInput.value = "";
    },
    startEdit(post) {
      this.editingId = post.id;
      this.editingBody = post.body;
    },
    cancelEdit() {
      this.editingId = null;
      this.editingBody = "";
    },
    async handleUpdatePost(id) {
      await updatePost(id, { body: this.editingBody });
      this.editingId = null;
      this.editingBody = "";
    },
    async handleDeletePost(id) {
      await deletePost(id);
    },
  },
  async mounted() {
    this.posts = await getPosts();
    subscribeToAuthChanges((userData) => (this.user = userData));
    this.unsubscribeFromPosts = subscribeToPosts(async () => {
      this.posts = await getPosts();
    });
  },
  unmounted() {
    if (this.newPost.preview) {
      URL.revokeObjectURL(this.newPost.preview);
    }
    if (this.unsubscribeFromPosts) {
      this.unsubscribeFromPosts();
    }
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
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-neutral-700"
            for="image"
            >Imagen (opcional)</label
          >
          <input
            id="image"
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="handlePostImageChange"
          />
          <img
            v-if="newPost.preview"
            :src="newPost.preview"
            alt="Vista previa de la imagen"
            class="mt-2 max-h-48 rounded-lg object-cover"
          />
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

          <form
            v-if="editingId === post.id"
            action="#"
            @submit.prevent="handleUpdatePost(post.id)"
          >
            <textarea
              class="w-full min-h-24 resize-y rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              v-model="editingBody"
            ></textarea>
            <div class="mt-2 flex gap-2">
              <button
                class="rounded-lg bg-neutral-900 px-4 py-1 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
                type="submit"
              >
                Guardar
              </button>
              <button
                class="rounded-lg border border-neutral-300 px-4 py-1 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
                type="button"
                @click="cancelEdit"
              >
                Cancelar
              </button>
            </div>
          </form>

          <template v-else>
            <p>{{ post.body }}</p>
            <img
              v-if="post.image_url"
              :src="post.image_url"
              alt="Imagen de la publicación"
              class="mt-2 max-h-80 rounded-lg object-cover"
            />
            <div v-if="post.user_id === user.id" class="mt-2 flex gap-4">
              <button
                class="text-sm text-neutral-500 underline hover:text-neutral-900 transition-colors"
                type="button"
                @click="startEdit(post)"
              >
                Editar
              </button>
              <button
                class="text-sm text-red-500 underline hover:text-red-700 transition-colors"
                type="button"
                @click="handleDeletePost(post.id)"
              >
                Eliminar
              </button>
            </div>
          </template>

          <PostComments :post-id="post.id" :user="user" />
        </li>
      </ol>
    </section>
  </div>
</template>
