<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
    };
  },
  mounted() {
    // Anslut till Socket.IO-servern
    this.socket = io('http://localhost:3000', {
      path: '/socketchat',
    });

    // this.socket = io('/socket', {
    //   path: '/socketchat',
    // });

    // När du är ansluten loggas det ut.
    this.socket.on('connect', () => {
      console.log('Ansluten till socket.io-servern!');
    });

    // Om anslutningen misslyckas loggas det ut.
    this.socket.on('connect_error', (error) => {
      console.log('Socket.io Error: ', error);
    });

    // När ett nytt meddelande kommer från servern till klienten läggs det till i listan med meddelanden.
    this.socket.on('chat message', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    // Skicka/emitta meddelande till servern
    sendMessage() {
      this.socket.emit('chat message', {
        text: this.newMessage,
        id: Date.now(),
      });
      this.newMessage = '';
    },
  },
  beforeUnmount() {
    // När komponenten tas bort stängs anslutningen till servern.
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>
