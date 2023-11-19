const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const dotenv = require('dotenv');
const { authenticateToken } = require('../middlewares/auth');
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.post('/', authenticateToken, async (request, response) => {
  const { title, content } = request.body;
  const user_id = request.userId;

  try {
    const topicsInsertQuery =
      'INSERT INTO topics (title, created_by) VALUES ($1, $2) RETURNING topic_id';
    const topicsInsertParams = [title, user_id];
    const topicsResult = await client.query(
      topicsInsertQuery,
      topicsInsertParams
    );

    const topicId = topicsResult.rows[0].topic_id;

    const postsInsertQuery =
      'INSERT INTO posts (content, created_by, topic) VALUES ($1, $2, $3) RETURNING *';
    const postsInsertParams = [content, user_id, topicId];
    const postsResult = await client.query(postsInsertQuery, postsInsertParams);

    response.json({
      topic: topicsResult.rows[0],
      post: postsResult.rows[0],
    });

    console.log('Added Topic and Post');
  } catch (error) {
    console.error('Post failed:', error);

    return response.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
