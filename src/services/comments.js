import { supabase } from "./supabase";

/**
 * @param {number} post_id
 * @returns {Promise<{id: number, post_id: number, user_id: string, body: string, created_at: string}[]>}
 */
export async function getCommentsByPost(post_id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*, user_profiles(display_name)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error al traer los comentarios:", error.message);
    throw new Error(error.message);
  }
  return data;
}

/**
 * @param {{post_id: number, user_id: string, body: string}} comment
 */
export async function createComment({ post_id, user_id, body }) {
  const { error } = await supabase
    .from("comments")
    .insert({ post_id, user_id, body });
  if (error) {
    console.error("Error al crear el comentario:", error.message);
    throw new Error(error.message);
  }
}

/**
 * @param {number} id
 */
export async function deleteComment(id) {
  const { error } = await supabase.from("comments").delete().eq("id", id);
  if (error) {
    console.error("Error al eliminar el comentario:", error.message);
    throw new Error(error.message);
  }
}

/**
 * @param {number} post_id
 * @param {(payload: object) => void} callback
 * @returns {() => void}
 */
export function subscribeToComments(post_id, callback) {
  const commentsChannel = supabase.channel(`comments_post_${post_id}`);
  commentsChannel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "comments",
      filter: `post_id=eq.${post_id}`,
    },
    (payload) => {
      callback(payload);
    },
  );
  commentsChannel.subscribe();

  return () => {
    commentsChannel.unsubscribe();
  };
}
