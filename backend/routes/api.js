const express = require('express')
const router = express.Router()
const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI,
})
client.connect()

router.post('/', async (req, res) => {
  console.log('funkar', req.body)
  try {
    const { user_id } = req.body

    const { rows } = await client.query(
      'SELECT * FROM users WHERE user_id = $1',
      [user_id]
    )

    const { message } = req.body

    await client.query(
      'INSERT INTO messages (user_id, message) VALUES ($1, $2)',
      [user_id, message]
    )

    await client.query(
      'DELETE FROM messages WHERE id < (SELECT MAX(id) - 99 FROM messages)'
    )

    res.status(200).json({ user: rows[0] })
  } catch (error) {
    console.log(error)
  }
})

router.get('/latest', async (req, res) => {
  try {
    const { offset = 0, limit = 10 } = req.query

    const { rows } = await client.query(
      'SELECT messages.message, messages.timestamp, users.username,users.user_id, users.image_path FROM messages INNER JOIN users ON messages.user_id = users.user_id ORDER BY timestamp DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    )

    res.status(200).json({ messages: rows.reverse() })
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
