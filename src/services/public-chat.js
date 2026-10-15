import { supabase } from "./supabase";

/**
 *
 * @param {{email: string, body: string}} data
 */

export async function sendPublicChatMessage({ email, body }) {
  const { error } = await supabase.from("public_chat").insert({
    email,
    body,
  });

  if (error) {
    console.error("Error al enviar el mensaje", error);
    throw new Error(error.message);
  }
}

/**
 *
 * @returns {Promise<{id: number, email: string, body: string, created_at: string}[]>}
 */
export async function getLastPublicChatMesagges() {
  const { data, error } = await supabase.from("public_chat").select();
  if (error) {
    console.error("Error al traer los mensajes del chat", error);
    throw new Error(error.message);
  }
  return data;
}

/**
 * 
 * @param {(newMessage: {id: number, email: string, body: string, created_at: string}) => void} callback 
 */

export function subscribeToPublicChatNewMessages(callback) {
  const chatChannel = supabase.channel("public_chat_channel");
  chatChannel.on(
    "postgres_changes",
    { event: "INSERT", 
      schema: "public", 
      table: "public_chat"
    },
    payload => {
      callback(payload.new);
    },
  );
  chatChannel.subscribe();
}
