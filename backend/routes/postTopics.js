const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.post('/', async (request, response) => {
  const { title, created_by, content } = request.body;

  try {
    const topicsInsertQuery =
      'INSERT INTO topics (title, created_by) VALUES ($1, $2) RETURNING topic_id';
    const topicsInsertParams = [title, created_by];
    const topicsResult = await client.query(
      topicsInsertQuery,
      topicsInsertParams
    );

    const topicId = topicsResult.rows[0].topic_id;

    const postsInsertQuery =
      'INSERT INTO posts (content, created_by, topic) VALUES ($1, $2, $3) RETURNING *';
    const postsInsertParams = [content, created_by, topicId];
    const postsResult = await client.query(postsInsertQuery, postsInsertParams);

    response.json({
      topic: topicsResult.rows[0],
      post: postsResult.rows[0],
    });

    console.log('Du har lagt till en topic och en post samtidigt');
  } catch (error) {
    console.error('Fel vid POST-förfrågan:', error);

    return response.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
