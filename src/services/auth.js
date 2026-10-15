import { supabase } from "./supabase";

/**
 * @param {string} email
 * @param {string} password
 * @param {string} display_name
 */
export async function register(email, password, display_name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    console.error("Error registrando usuario:", error.message);
    throw new Error(error.message);
  }

  const { error: errorProfile } = await supabase.from("user_profiles").insert({
    id: data.user.id,
    email,
    display_name,
  });
  if (errorProfile) {
    console.error("Error creando perfil de usuario:", errorProfile.message);
    throw new Error(errorProfile.message);
  }

  return data;
}
/**
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error("Error iniciando sesión:", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error cerrando sesión:", error.message);
    throw new Error(error.message);
  }
}

let userData = {
  id: null,
  email: null,
  bio: null,
  display_name: null,
};
let observers = [];
supabase.auth.onAuthStateChange(async (event, session) => {
  if (session !== null) {
    userData = {
      id: session.user.id,
      email: session.user.email,
    };
    const { data, error } = await supabase
      .from("user_profiles")
      .select()
      .eq("id", userData.id);
    if (error) {
      console.error("Error al traer el perfil del usuario:", error.message);
      throw new Error(error.message);
    }
    userData = {
      ...userData,
      bio: data[0]?.bio,
      display_name: data[0]?.display_name,
    };
  } else {
    userData = {
      id: null,
      email: null,
      bio: null,
      display_name: null,
    };
  }
  notifyAll();
});

/**
 *
 * @param {() => {}} callback
 */
export function subscribeToAuthChanges(callback) {
  observers.push(callback);
  notify(callback);
}

/**
 *
 * @param {() => {}} callback
 */
function notify(callback) {
  callback(userData);
}

function notifyAll() {
  observers.forEach(notify);
}
