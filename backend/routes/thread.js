const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get('/:topicId', async (request, response) => {
  try {
    const topicId = request.params.topicId;
    const query = `
      SELECT
        t.topic_id,
        t.title AS topic_title,
        t.created_by AS topic_created_by_id,
        tu.username AS topic_created_by,
        p.post_id,
        p.content AS post_content,
        u.username AS post_created_by,
        t.created_at AS topic_created_at,
        p.created_at AS post_created_at
      FROM
        topics t
      JOIN
        users tu ON t.created_by = tu.user_id
      JOIN
        posts p ON t.topic_id = p.topic
      JOIN
        users u ON p.created_by = u.user_id
      WHERE
        t.topic_id = $1;
    `;
    const { rows } = await client.query(query, [topicId]);

    if (rows.length === 0) {
      response.status(404).send('Topic not found');
    } else {
      response.send(rows);
    }
  } catch (error) {
    console.error('Error fetching topics:', error);
    response.status(500).send('Internal Server Error');
  }
});

module.exports = router;
