<template>
  <div>
    <div
      v-for="(msg, index) in messages"
      :key="index"
      :class="{
        'chat-start': isOtherUser(msg.senderSocketId),
        'chat-end': !isOtherUser(msg.senderSocketId),
      }"
    >
      <div class="chat-header">
        {{ msg.username }}
        <time class="text-xs opacity-50">{{ getTimeAgo(msg.timestamp) }}</time>
      </div>

      <div class="chat-bubble">{{ msg.message }}</div>
      <div class="chat-footer opacity-50">
        {{ msg.status }}
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
import io from 'socket.io-client'
import moment from 'moment'

export default {
  data() {
    return {
      socket: null,
      message: '',
      messages: [],
      currentUserSocketId: '',
    }
  },

  mounted() {
    this.socket = io('http://localhost:3000', {
      path: '/socketchat',
    })
    console.log('Component mounted')
    this.socket.on('chat message', (msg) => {
      console.log('Received message:', msg)
      this.messages.push(msg)
    })
  },

  methods: {
    isOtherUser(senderSocketId) {
      return senderSocketId !== this.currentUserSocketId
    },

    sendMessage() {
      console.log('Sending message:', this.message)
      if (this.message.trim() !== '') {
        this.socket.emit('chat message', {
          message: this.message,
          username: 'Fast värde', // Replace with the actual username
          timestamp: new Date(), // Use the current timestamp
          status: 'Delivered', // Set the initial status
          senderSocketId: this.socket.id,
        })
        this.message = ''
      }
    },

    getTimeAgo(timestamp) {
      return moment(timestamp).fromNow() // Use Moment.js for time ago
    },
  },
}
</script>
