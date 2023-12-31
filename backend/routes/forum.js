const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get("/", async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const pageSize = 10;
    const offset = Math.max(0, (page - 1) * pageSize);
    const query = `
    WITH LatestPosts AS (
      SELECT
        topics.*,
        posts.*,
        ROW_NUMBER() OVER (PARTITION BY topics.topic_id ORDER BY posts.created_at DESC) AS rn
      FROM
        topics
      LEFT JOIN
        posts ON topics.topic_id = posts.topic
    )
    SELECT
      *
    FROM
      LatestPosts
    WHERE
      rn = 1
    ORDER BY
      LatestPosts.topic_id DESC
    LIMIT
      $1 OFFSET $2;`;
    /*
    const query = `
      SELECT *
      FROM topics
      LEFT JOIN posts ON topics.topic_id = posts.topic
      ORDER BY topics.topic_id DESC
      LIMIT $1 OFFSET $2;
    `;
*/
    const { rows } = await client.query(query, [pageSize, offset]);
    console.log(rows);
    response.send(rows);
  } catch (error) {
    console.error("Error fetching topics:", error);
    response.status(500).send("Internal Server Error");
  }
});

module.exports = router;

/*
const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get("/", async (_request, response) => {
  try {
    const query = `
      SELECT *
      FROM topics
      LEFT JOIN posts ON topics.topic_id = posts.topic;
    `;
    const { rows } = await client.query(query, []);

    response.send(rows);
  } catch (error) {
    console.error("Error fetching topics:", error);
    response.status(500).send("Internal Server Error");
  }
});


//Har lånat post från Viktor för att testa
router.post("/", async (request, response) => {
  const { title, created_by, content } = request.body;

  try {
    const topicsInsertQuery =
      "INSERT INTO topics (title, created_by) VALUES ($1, $2) RETURNING topic_id";
    const topicsInsertParams = [title, created_by];
    const topicsResult = await client.query(
      topicsInsertQuery,
      topicsInsertParams
    );

    const topicId = topicsResult.rows[0].topic_id;

    const postsInsertQuery =
      "INSERT INTO posts (content, created_by, topic) VALUES ($1, $2, $3) RETURNING *";
    const postsInsertParams = [content, created_by, topicId];
    const postsResult = await client.query(postsInsertQuery, postsInsertParams);

    // Skicka en JSON-respons med resultaten från båda INSERT-operationerna
    response.json({
      topic: topicsResult.rows[0],
      post: postsResult.rows[0],
    });

    console.log("Du har lagt till en topic och en post samtidigt");
  } catch (error) {
    // Lägg till loggar för att inspektera eventuella fel
    console.error("Fel vid POST-förfrågan:", error);

    // Hantera fel och skicka en felrespons
    return response.status(500).json({
      error: error.message,
    });
  }
});*/

module.exports = router;
