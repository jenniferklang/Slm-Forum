<template>
  <div class="flex flex-col justify-center items-center">
    <div
      class="w-[50%] mx-auto h-[80vh] overflow-scroll bg-gray-300 rounded-xl relative"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="
          msg.user_id === parseInt(loggedInUser)
            ? 'chat-end ml-auto'
            : 'chat-start mr-auto'
        "
        class="border-base-300 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[10rem] max-w-4xl flex-wrap flex-col justify-center gap-2 bg-top p-4 max-w-[15rem]"
      >
        <div class="chat-header">
          {{ msg.username }}
          <time class="text-xs opacity-50">{{
            getTimeAgo(msg.timestamp)
          }}</time>
        </div>

        <div class="chat-bubble">{{ msg.message }}</div>
        <div class="chat-footer opacity-50">{{ getStatus(msg) }}</div>
      </div>
    </div>
    <div class="flex w-[100%] justify-center items-center mt-10 gap-5">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Skriv ett meddelande"
        class="p-2 border grow-1"
      />
      <button
        @click="sendMessage"
        class="p-2 bg-blue-500 text-white rounded grow-0"
      >
        Skicka
      </button>
      <button
        @click="fetchNextMessages"
        class="p-2 bg-blue-500 text-white rounded grow-0"
      >
        Nya msg
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'

import { socket, state } from '../socket'

export default {
  data() {
    return {
      message: '',
      username: '',
    }
  },

  mounted() {
    this.fetchLatestMessages()
  },

  computed: {
    loggedInUser() {
      return sessionStorage.getItem('user_id')
    },

    connected() {
      return state.connected
    },

    users() {
      return state.users
    },

    messages() {
      return state.messages
    },
  },

  methods: {
    async sendMessage() {
      const response = await axios.post('/api/chat', {
        user_id: sessionStorage.getItem('user_id'),
        message: this.message,
      })
      console.log('First Message:', this.message)
      socket.emit('chat message', {
        message: this.message,
        username: response.data.user.username,
        timestamp: new Date(),
        user_id: response.data.user.user_id,
      })
      this.message = ''
    },

    getStatus(msg) {
      if (msg.user_id === parseInt(this.loggedInUser)) {
        return 'Delivered'
      } else {
        return 'Received'
      }
    },

    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow()
    },

    async fetchLatestMessages() {
      try {
        // Fetch the latest 10 messages from the server
        const response = await axios.get('/api/chat/latest')

        // Update the state with the fetched messages
        state.messages = response.data.messages
      } catch (error) {
        console.error('Error fetching latest messages:', error)
      }
    },
    async fetchNextMessages() {
      try {
        const offset = this.messages.length // Calculate the offset based on the current number of messages

        const response = await axios.get(`/api/chat/latest?offset=${offset}`)

        // Append the fetched messages to the existing messages
        state.messages = [...response.data.messages, ...state.messages]
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    },
  },
}
</script>
<style scoped>
/* .chat-container {
  position: relative;
  min-height: 100vh;
} --> */

.chat-input-container {
  background-color: rgba(255, 255, 255, 0);
}

/* <!-- .chat-input-container input,
.chat-input-container button {
  margin: 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
} --> */
</style>
