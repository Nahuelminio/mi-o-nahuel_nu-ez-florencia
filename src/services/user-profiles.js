import { supabase } from "./supabase.js";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string, bio: string, display_name: string}>}
 */

export async function getUserProfileById(id) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", id);
  if (error) {
    console.error("Error al traer el perfil del usuario:", error.message);
    throw new Error(error.message);
  }
  return data?.[0];
}

/**
 * 
 * @param {id: string, email: string, bio: string, display_name: string} data 
 * @returns {Promise<void>}
 */

export async function createUserProfile(data) {
  const { error} = await supabase
  .from("user_profiles")
  .insert(data);

  if (error) {
    console.error("Error creando perfil de usuario:", error.message);
    throw new Error(error.message);
  }
}

export async function updateUserProfile(id,data) {
    const { error} = await supabase
    .from("user_profiles")
    .update(data)
    .eq("id", id);

      if (error) {
    console.error("Error al editar el perfil de usuario:", error.message);
    throw new Error(error.message);
  }
}