<template>
  <div>
    <div
      class="border-base-300 bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap flex-col items-center justify-center gap-2 bg-top p-4"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="msg.username === loggedInUser ? 'chat-end' : 'chat-start'"
      >
        <div class="chat-header">
          {{ msg.username }}
          <time class="text-xs opacity-50">{{
            getTimeAgo(msg.timestamp)
          }}</time>
        </div>

        <div class="chat-bubble">{{ msg.message }}</div>
        <div class="chat-footer opacity-50">
          {{ msg.status }}
        </div>
      </div>
    </div>
    <div class="flex space-x-2">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type a message"
        class="p-2 border rounded"
      />
      <button @click="sendMessage" class="p-2 bg-blue-500 text-white rounded">
        Send
      </button>
    </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';
import moment from 'moment';

import { socket, state } from '../socket';

export default {
  data() {
    return {
      socket: null,
      message: '',
      currentUserSocketId: '',
    };
  },

  mounted() {
    console.log('Logged in user:', this.loggedInUser);
    this.socket = socket;
    // this.socket = io('http://localhost:3000', {
    //   path: '/socketchat',
    // });
    // console.log('Socket ID:', this.socket);
    // this.socket.on('connection', () => {
    //   console.log('Socket connection:', socket);
    // });
    // this.socket.on('new user', (socketId) => {
    //   console.log('New user connected:', socketId);
    //   this.currentUserSocketId = socketId;
    // });

    this.socket.on('user disconnected', (socketId) => {
      console.log('User disconnected:', socketId);
    });
  },

  computed: {
    loggedInUser() {
      return sessionStorage.getItem('user_id');
    },

    connected() {
      return state.connected;
    },

    users() {
      return state.users;
    },

    messages() {
      return state.messages;
    },
  },

  methods: {
    isOtherUser(senderSocketId) {
      return senderSocketId !== this.currentUserSocketId;
    },

    sendMessage() {
      console.log('Sending message:', this.message);
      if (this.message.trim() !== '') {
        this.socket.emit('chat message', {
          message: this.message,
          username: sessionStorage.getItem('user_id'), // Replace with the actual username
          timestamp: new Date(), // Use the current timestamp
          status: 'Delivered', // Set the initial status
          senderSocketId: this.socket.id,
        });
        this.message = '';
      }
    },

    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow(); // Use Moment.js for time ago
    },
  },
};
</script>
