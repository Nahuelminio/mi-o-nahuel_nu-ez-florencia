import { supabase } from "./supabase";
import {
  createUserProfile,
  getUserProfileById,
  updateUserProfile,
} from "./user-profiles.js";
import { uploadFile, getFileUrl } from "./storage.js";

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
  await createUserProfile({
    id: data.user.id,
    email,
    display_name,
  });

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
export async function updateAuthuserProfile(data) {
  try {
    await updateUserProfile(userData.id, data);
    updateUserData(data);
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error.message);
    throw new Error(error.message);
  }
}
/**
 * @param {string} password
 */
export async function updateAuthUserPassword(password) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error("Error al actualizar la contraseña:", error.message);
    throw new Error(error.message);
  }
}
export async function updateAuthUserPhoto(file) {
  try {
    const photoName = `${userData.id}/${crypto.randomUUID()}.jpg`;
    await uploadFile(photoName, file, "avatars");

    const photoUrl = getFileUrl(photoName, "avatars");
    await updateUserProfile(userData.id, { photo_url: photoUrl });
    updateUserData({ photo_url: photoUrl });

  } catch (error) {
    console.error("Error al actualizar la foto de perfil del usuario:", error.message);
    throw new Error(error.message);
  }
}
let userData = {
  id: null,
  email: null,
  bio: null,
  display_name: null,
  photo_url: null,
};
let observers = [];

if (localStorage.getItem("user")) {
  userData = JSON.parse(localStorage.getItem("user"));
  await supabase.auth.getSession();
}

supabase.auth.onAuthStateChange(async (event, session) => {
  if (session !== null) {
    updateUserData({
      id: session.user.id,
      email: session.user.email,
    });
    getUserProfileById(userData.id).then((profile) => {
      updateUserData({
        bio: profile.bio,
        display_name: profile.display_name,
        photo_url: profile.photo_url,
      });
    });
  } else {
    clearUserData();
  }
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

function updateUserData(newData) {
  userData = {
    ...userData,
    ...newData,
  };
  localStorage.setItem("user", JSON.stringify(userData));
  notifyAll();
}

function clearUserData() {
  userData = {
    id: null,
    email: null,
    bio: null,
    display_name: null,
    photo_url: null,
  };
  localStorage.removeItem("user");
  notifyAll();
}