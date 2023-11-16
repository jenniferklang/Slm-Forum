import { reactive } from 'vue';
import { io } from 'socket.io-client';

export const state = reactive({
  connected: false,
  users: [],
  messages: [],
});

export const socket = io({ path: '/socketchat'});

socket.on('connect', () => {
  state.connected = true;
  console.log('Connected to socket.io server');
});

socket.on('disconnect', () => {
  state.connected = false;
});

socket.on('new user', (args) => {
  console.log('Other user connected to chat: ', args);
});

socket.on('chat message', (msg) => {
  console.log('Received message:', msg);
  state.messages.push(msg);
});

// socket.on('bar', (...args) => {
//   state.barEvents.push(args);
// });
