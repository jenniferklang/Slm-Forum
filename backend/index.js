const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const cors = require('cors')
const { authenticateToken } = require('./middlewares/auth')
const { initializeSocketIO } = require('./modules/socketio')

const port = process.env.PORT || 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(authenticateToken)

const auth = require('./routes/auth')
const api = require('./routes/api')
const postTopics = require('./routes/postTopics')
const forum = require('./routes/forum')
const user = require('./routes/user')

app.use('/api/auth', auth)
app.use('/api', api)
app.use('/api/postTopics', postTopics)
app.use('/api/forum', forum)
app.use('/api/user', user)

const server = http.createServer(app)
const io = initializeSocketIO(server)
io.on('error', (error) => {
  console.error('Socket.IO Error:', error)
})

server.listen(port, () => {
  console.log(`Ready on ${port}`)
})
