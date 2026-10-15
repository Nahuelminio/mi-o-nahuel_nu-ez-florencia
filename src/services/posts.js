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
 * @param {{user_id: string, body: string}} post
 */
export async function createPost({ user_id, body }) {
  const { error } = await supabase.from("posts").insert({ user_id, body });
  if (error) {
    console.error("Error al crear la publicación:", error.message);
    throw new Error(error.message);
  }
}
