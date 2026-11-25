<script>
import {
  getCommentsByPost,
  createComment,
  deleteComment,
  subscribeToComments,
} from "../services/comments.js";

export default {
  name: "PostComments",
  props: {
    postId: {
      type: Number,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: { body: "" },
      unsubscribeFromComments: null,
    };
  },
  methods: {
    async handleCreateComment() {
      await createComment({
        post_id: this.postId,
        user_id: this.user.id,
        body: this.newComment.body,
      });
      this.newComment.body = "";
    },
    async handleDeleteComment(id) {
      await deleteComment(id);
    },
  },
  async mounted() {
    this.comments = await getCommentsByPost(this.postId);
    this.unsubscribeFromComments = subscribeToComments(
      this.postId,
      async () => {
        this.comments = await getCommentsByPost(this.postId);
      },
    );
  },
  unmounted() {
    if (this.unsubscribeFromComments) {
      this.unsubscribeFromComments();
    }
  },
};
</script>

<template>
  <div class="mt-4 border-t border-neutral-200 pt-4">
    <h3 class="mb-2 text-sm font-semibold text-neutral-700">Comentarios</h3>
    <ul class="mb-3 flex flex-col gap-2">
      <li v-for="comment in comments" :key="comment.id" class="text-sm">
        <span class="font-medium"
          >{{ comment.user_profiles?.display_name ?? "Anónimo" }}:</span
        >
        {{ comment.body }}
        <button
          v-if="comment.user_id === user.id"
          class="ml-2 text-red-500 underline hover:text-red-700 transition-colors"
          type="button"
          @click="handleDeleteComment(comment.id)"
        >
          Eliminar
        </button>
      </li>
      <li v-if="comments.length === 0" class="text-sm text-neutral-400">
        Todavía no hay comentarios.
      </li>
    </ul>
    <form
      v-if="user.id"
      action="#"
      class="flex gap-2"
      @submit.prevent="handleCreateComment"
    >
      <input
        type="text"
        placeholder="Escribí un comentario"
        class="flex-1 rounded-lg border border-neutral-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
        v-model="newComment.body"
        required
      />
      <button
        class="rounded-lg bg-neutral-900 px-3 py-1 text-sm font-semibold text-white hover:bg-neutral-700 transition-colors"
        type="submit"
      >
        Comentar
      </button>
    </form>
  </div>
</template>
