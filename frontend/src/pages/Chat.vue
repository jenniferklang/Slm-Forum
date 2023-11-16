<template>
  <div>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Type a message"
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import socket from '../socket'

export default {
  data() {
    return {
      message: '',
      messages: [],
    }
  },

  mounted() {
    console.log('Component mounted')
    socket.on('chat message', (msg) => {
      console.log('Received message:', msg)
      this.messages.push(msg)
    })
  },

  methods: {
    sendMessage() {
      console.log('Sending message:', this.message)
      if (this.message.trim() !== '') {
        socket.emit('chat message', this.message)
        this.message = ''
      }
    },
  },
}
</script>
