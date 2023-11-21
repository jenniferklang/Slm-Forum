const express = require("express");
const router = express.Router();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.put("/", async (req, res) => {
  console.log("Put request");
  const { id, value, label, path } = req.body;

  if (label === "Name") {
    await client.query("UPDATE users SET name = $1 WHERE user_id = $2", [
      value,
      id,
    ]);
    const { rows } = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.send(rows);
  }

  if (label === "Email") {
    await client.query("UPDATE users SET mail = $1 WHERE user_id = $2", [
      value,
      id,
    ]);
    const { rows } = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.send(rows);
  }

  if (label === "Username") {
    await client.query("UPDATE users SET username = $1 WHERE user_id = $2", [
      value,
      id,
    ]);
    const { rows } = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.send(rows);
  }

  if (label === "Password") {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value, saltRounds);

    await client.query("UPDATE users SET password = $1 WHERE user_id = $2", [
      hashedPassword,
      id,
    ]);
    const { rows } = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.send(rows);
  }

  if (label === "image_path") {
    await client.query("UPDATE users SET image_path = $1 WHERE user_id = $2", [
      path,
      id,
    ]);
    const { rows } = await client.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id]
    );
    res.send(rows);
  }
  console.log("User Information Updated");
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
  res.clearCookie("token");
  res.send(rows);
});

module.exports = router;
