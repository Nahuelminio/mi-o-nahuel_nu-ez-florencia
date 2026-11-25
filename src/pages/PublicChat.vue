<script>
import BaseH1 from "../components/BaseH1.vue";
import {
  getLastPublicChatMesagges,
  sendPublicChatMessage,
  subscribeToPublicChatNewMessages,
} from "../services/public-chat.js";
import { subscribeToAuthChanges } from "../services/auth.js";

let unsubscribeFromChat = () => {};
export default {
  name: "PublicChat",
  components: {
    BaseH1,
  },
  data() {
    return {
      messages: [],
      newMessage: {
        email: "",
        body: "",
      },
      user: {
        id: null,
        email: null,
        bio: null,
        display_name: null,
      }
    };
  },
  methods: {
    async handleMessageSend() {
      try {
        sendPublicChatMessage({
          seder_id: this.user.id,
          email: this.newMessage.email,
          body: this.newMessage.body,
        });
        this.newMessage.body = "";
      } catch (error) {
        console.error("Error al enviar el mensaje", error);
      }
    },
  },
  async mounted() {
    try {
      subscribeToAuthChanges(userData => this.user = userData);
      this.messages = await getLastPublicChatMesagges();
      unsubscribeFromChat = subscribeToPublicChatNewMessages((receivedMessage) =>
        this.messages.push(receivedMessage),
      );
    } catch (error) {
      console.error("Error al traer los mensajes del chat", error);
    }
  },
  unmounted() {
    unsubscribeFromChat();
  },
};
</script>
<template>
  <BaseH1 class="text-white">Chat publico</BaseH1>

  <div class="flex flex-col md:flex-row gap-6">
    <section
      class="w-full md:w-2/3 h-[28rem] overflow-y-auto p-4 bg-white rounded-xl shadow-sm border border-neutral-200"
    >
      <h2 class="sr-only">Lista de mensajes</h2>
      <ol class="space-y-3" aria-live="polite">
        <li
          v-for="message in messages"
          :key="message.id"
          class="mb-3 p-3 rounded-lg bg-neutral-100"
        >
          <p class="mb-1 text-xs text-neutral-500">
            <RouterLink :to="`/usuario/${message.sender_id}`" class="text-neutral-900 font-semibold hover:underline">
              {{ message.display_name ?? "Usuario desconocido" }}
            </RouterLink>
            {{ message.email }} -
            {{ new Date(message.created_at).toLocaleString() }}
          </p>
          <p class="text-neutral-800">{{ message.body }}</p>
        </li>
      </ol>
    </section>
    <section
      class="w-full md:w-1/3 self-start p-6 bg-white rounded-xl shadow-sm border border-neutral-200"
    >
      <h2 class="mb-4 text-lg font-semibold">Enviar mensaje</h2>
      <form action="#" @submit.prevent="handleMessageSend">
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-neutral-700"
            for="email"
            >Email</label
          >
          <input
            type="email"
            id="email"
            placeholder="Escribe tu email"
            class="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            v-model="newMessage.email"
          />
        </div>
        <div class="mb-4">
          <label
            class="block mb-2 text-sm font-medium text-neutral-700"
            for="body"
            >Mensaje</label
          >
          <textarea
            id="body"
            class="w-full min-h-24 rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            placeholder="Escribe tu mensaje"
            v-model="newMessage.body"
          ></textarea>
        </div>
        <button
          class="w-full rounded-lg bg-neutral-900 px-4 py-2 font-semibold text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 transition-colors"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </section>
  </div>
</template>
