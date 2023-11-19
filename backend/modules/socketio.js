const { Server } = require('socket.io')

function initializeSocketIO(httpServer) {
  const io = new Server(httpServer, {
    path: '/socketchat', // /socketchat/
    cors: {
      // origin: 'http://frontend:80',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    io.emit('new user', socket.id)

    socket.on('disconnect', () => {
      console.log('User disconnected')
      io.emit('user disconnected', socket.id)
    })

    socket.on('chat message', (msg) => {
      console.log('Received message:', msg)
      io.emit('chat message', msg)
    })
  })

  return io
}

module.exports = { initializeSocketIO }
