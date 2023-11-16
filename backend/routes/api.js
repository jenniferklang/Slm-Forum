const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.get('/', async (_request, response) => {
  console.log('Get request');
  const { rows } = await client.query('SELECT * FROM topics;', []);

  response.send(rows);
});

router.put('/', async (request, response) => {
  console.log('Put request');
  const { id, population } = request.body;

  await client.query('UPDATE cities SET population = $1 WHERE id = $2', [
    population,
    id,
  ]);

  const { rows } = await client.query(
    'SELECT * FROM cities ORDER BY name ASC',
    []
  );

  response.send(rows);
});

router.delete('/', async (request, response) => {
  console.log('Delete request');
  const { id } = request.body;

  await client.query('DELETE FROM cities WHERE id = $1', [id]);

  const { rows } = await client.query(
    'SELECT * FROM cities ORDER BY name ASC',
    []
  );

  response.send(rows);
});

router.post('/', async (request, response) => {
  console.log('Post request');
  const { name, population } = request.body;

  try {
    await client.query(
      'INSERT INTO cities (name, population) VALUES ($1, $2)',
      [name, population]
    );

    const { rows } = await client.query(
      'SELECT * FROM cities ORDER BY name ASC',
      []
    );

    response.send(rows);
  } catch (error) {
    console.log(error);

    if (error.code === '23505') {
      return response.status(400).send('City already exists');
    }
  }
});

module.exports = router;
