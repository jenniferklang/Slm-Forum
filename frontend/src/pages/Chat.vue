<template>
  <div class="flex flex-col justify-center items-center">
    <div
      ref="chatContainer"
      class="w-[50%] mx-auto h-[80vh] overflow-scroll rounded-xl relative border"
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
        <div class="flex gap-3">
          <div
            v-if="msg.user_id === parseInt(loggedInUser)"
            class="chat-bubble mb-3 mr-1"
          >
            {{ msg.message }}
          </div>
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img :alt="`Avatar of ${msg.username}`" :src="msg.image_path" />
            </div>
          </div>

          <div
            v-if="msg.user_id !== parseInt(loggedInUser)"
            class="chat-bubble mb-3 ml-1"
          >
            {{ msg.message }}
          </div>
        </div>
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
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatContainer

        if (chatContainer) {
          const scrollHeight = chatContainer.scrollHeight
          const clientHeight = chatContainer.clientHeight

          chatContainer.scrollTop = scrollHeight - clientHeight
        }
      })
    },

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
        image_path: response.data.user.image_path,
      })
      this.message = ''

      setTimeout(() => {
        this.scrollToBottom()
      }, 50)
    },

    getStatus(msg) {
      if (msg.user_id === parseInt(this.loggedInUser)) {
        return 'Skickat'
      } else {
        return 'Mottaget'
      }
    },

    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow()
    },

    async fetchLatestMessages() {
      try {
        const response = await axios.get('/api/chat/latest')

        state.messages = response.data.messages
      } catch (error) {
        console.error('Error fetching latest messages:', error)
      }
    },
    async fetchNextMessages() {
      try {
        const offset = this.messages.length

        const response = await axios.get(`/api/chat/latest?offset=${offset}`)
        console.log('Received Messages:', response.data.messages)
        state.messages = [...response.data.messages, ...state.messages]
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    },
  },
}
</script>
