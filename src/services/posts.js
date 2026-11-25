import { supabase } from "./supabase";

/**
 * @returns {Promise<{id: number, user_id: string, body: string, created_at: string}[]>}
 */
export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, user_profiles(display_name)")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error al traer las publicaciones:", error.message);
    throw new Error(error.message);
  }
  return data;
}
/**
 * @param {{user_id: string, body: string, image_url?: string}} post
 */
export async function createPost({ user_id, body, image_url = null }) {
  const { error } = await supabase
    .from("posts")
    .insert({ user_id, body, image_url });
  if (error) {
    console.error("Error al crear la publicación:", error.message);
    throw new Error(error.message);
  }
}
/**
 * @param {number} id
 * @param {{body: string}} data
 */
export async function updatePost(id, data) {
  const { error } = await supabase.from("posts").update(data).eq("id", id);
  if (error) {
    console.error("Error al editar la publicación:", error.message);
    throw new Error(error.message);
  }
}
/**
 * @param {number} id
 */
export async function deletePost(id) {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error("Error al eliminar la publicación:", error.message);
    throw new Error(error.message);
  }
}
/**
 * @param {(payload: object) => void} callback
 * @returns {() => void}
 */
export function subscribeToPosts(callback) {
  const postsChannel = supabase.channel("posts_channel");
  postsChannel.on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => {
      callback(payload);
    },
  );
  postsChannel.subscribe();

  return () => {
    postsChannel.unsubscribe();
  };
}
