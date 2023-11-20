import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  users: [],
  messages: [],
})

let socket
if (import.meta.env.MODE === 'production') {
  socket = io({ path: '/socketchat' })
} else {
  socket = io('http://localhost:3000', {
    path: '/socketchat',
  })
}
export { socket }

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
