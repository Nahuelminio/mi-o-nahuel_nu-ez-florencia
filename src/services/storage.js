import { supabase } from "./supabase";

export async function uploadFile(filename, file, bucket) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filename, file);
  if (error) {
    console.error("Error al subir el archivo:", error.message);
    throw new Error(error.message);
  }
}

export function getFileUrl(filename, bucket) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);

  return data.publicUrl;
}
