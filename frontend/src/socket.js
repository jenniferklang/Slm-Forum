import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  users: [],
  messages: [],
})

// TA INTE BORT - BEHÖVS FÖR ATT KUNNA KÖRA VID PRODUKTION
// export const socket = io({ path: '/socketchat'});

export const socket = io('http://localhost:3000', {
  path: '/socketchat',
})

socket.on('connect', () => {
  state.connected = true
  console.log('Connected to socket.io server')
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('new user', (args) => {
  console.log('Other user connected to chat: ', args)
})

socket.on('chat message', (msg) => {
  state.messages.push(msg)
})
