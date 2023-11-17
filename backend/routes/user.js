const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

// router.put('/', async (request, response) => {
//   console.log('Put request');
//   const { id, population } = request.body;

//   await client.query('UPDATE cities SET population = $1 WHERE id = $2', [
//     population,
//     id,
//   ]);

//   const { rows } = await client.query(
//     'SELECT * FROM cities ORDER BY name ASC',
//     []
//   );

//   response.send(rows);
// });

router.delete("/", async (req, res) => {
  console.log("Delete request");
  const { id } = req.body;

  await client.query("DELETE FROM users WHERE user_id = $1", [id]);
  const { rows } = await client.query(
    "SELECT * FROM users ORDER BY name ASC",
    []
  );
  console.log(`User with id ${id} deleted!`);
  res.send(rows);
});

module.exports = router;
