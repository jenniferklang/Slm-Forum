const { Server } = require('socket.io')

function initializeSocketIO(httpServer) {
  const io = new Server(httpServer, {
    path: '/socketchat/',
    cors: {
      // origin: 'http://frontend:80',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })

    socket.on('chat message', (msg) => {
      console.log('Received message:', msg)
      io.emit('chat message', msg)
    })
  })

  return io
}

module.exports = { initializeSocketIO }
