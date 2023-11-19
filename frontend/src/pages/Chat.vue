<template>
  <div class="w-[50%] mx-auto">
    <div
      v-for="(msg, index) in messages"
      :key="index"
      :class="
        msg.user_id === parseInt(loggedInUser)
          ? 'chat-end ml-auto'
          : 'chat-start mr-auto'
      "
      class="border-base-300 bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[10rem] flex-wrap flex-col justify-center gap-2 bg-top p-4 max-w-[15rem]"
    >
      <div class="chat-header">
        {{ msg.username }}
        <time class="text-xs opacity-50">{{ getTimeAgo(msg.timestamp) }}</time>
      </div>

      <div class="chat-bubble">{{ msg.message }}</div>
      <div class="chat-footer opacity-50">{{ getStatus(msg) }}</div>
    </div>

    <div class="chat-input-container">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type a message"
        class="p-2 border rounded w-44"
      />
      <button
        @click="sendMessage"
        class="p-2 bg-blue-500 text-white rounded block"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

import { socket, state } from '../socket';

export default {
  data() {
    return {
      message: '',
      username: '',
    };
  },

  mounted() {
    console.log('Logged in user:', this.loggedInUser);
    this.socket = socket;

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
    async sendMessage() {
      const response = await axios.post('/api', {
        user_id: sessionStorage.getItem('user_id'),
      });

      socket.emit('chat message', {
        message: this.message,
        username: response.data.user.username,
        timestamp: new Date(),
        status: 'Delivered',
        user_id: response.data.user.user_id,
      });
      this.message = '';
    },

    getStatus(msg) {
      if (msg.username !== this.loggedInUser) {
        return msg.status === 'Delivered' ? 'Received' : msg.status;
      }
      return msg.status;
    },

    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow();
    },
  },
};
</script>
<style scoped>
.chat-container {
  position: relative;
  min-height: 100vh; /* Ensure the container takes at least the full height of the viewport */
}

.chat-input-container {
  position: sticky;
  bottom: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
  z-index: 1; /* Set z-index to make sure it stays above other elements */
  margin-top: auto; /* Push the container to the top of the available space */
}

.chat-input-container input,
.chat-input-container button {
  margin: 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

/* Your component-specific styles here */
</style>
