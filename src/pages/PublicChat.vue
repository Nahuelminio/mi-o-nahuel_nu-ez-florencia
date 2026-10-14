<script>
import BaseH1 from "../components/BaseH1.vue";
import {
  getLastPublicChatMesagges,
  sendPublicChatMessage,
  subscribeToPublicChatNewMessages,
} from "../services/public-chat.js";

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
    };
  },
  methods: {
    async handleMessageSend() {
      
      try {
        sendPublicChatMessage({
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
      this.messages = await getLastPublicChatMesagges();
      console.log(this.messages);
      subscribeToPublicChatNewMessages((receivedMessage) =>
        this.messages.push(receivedMessage),
      );
    } catch (error) {
      console.error("Error al traer los mensajes del chat", error);
    }
  },
};
</script>
<template>
  <BaseH1>Chat Publico</BaseH1>

  <div class="flex gap-4">
    <section class="w-3/4 border rounded p-4 min-h-100">
      <h2 class="sr-only">Lista de mensajes</h2>
      <ol>
        <li
          v-for="message in messages"
          :key="message.id"
          class="mb-4 border-b pb-2"
        >
          <p class="text-sm text-gray-500">
            {{ message.email }} -
            {{ new Date(message.created_at).toLocaleString() }}
          </p>
          <p>{{ message.body }}</p>
        </li>
      </ol>
    </section>
    <section class="w-1/4">
      <h2 class="mb-4 text-l">Enviar mensaje</h2>
      <form action="#" @submit.prevent="handleMessageSend">
        <div class="mb-4">
          <label class="block mb-1" for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Escribe tu email"
            class="border rounded p-2 w-full"
            v-model="newMessage.email"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-1" for="body">Mensaje</label>
          <textarea
            id="body"
            class="border rounded p-2 w-full"
            placeholder="Escribe tu mensaje"
            v-model="newMessage.body"
          ></textarea>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </section>
  </div>
</template>
