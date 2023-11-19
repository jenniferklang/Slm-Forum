const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.put("/", async (req, res) => {
  console.log("Put request");
  const { id, updatedName } = req.body;
  console.log(id, updatedName);
  await client.query("UPDATE users SET userName = $1 WHERE user_id = $2", [
    updatedName,
    id,
  ]);
  const { rows } = await client.query("SELECT * FROM users", []);
  res.send(rows);
});

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
