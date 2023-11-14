const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// router.use((req, res, next) => {
//   console.log('authRoute Time: ', Date.now());
//   next();
// });

const client = new Client({
  connectionString: process.env.PGURI_DEV,
});
client.connect();

router.get('/', async (_request, response) => {
  console.log('Get request');
  const { rows } = await client.query('SELECT * FROM topics;', []);

  response.send(rows);
});

module.exports = router;
