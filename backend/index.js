const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', async (_request, response) => {
  console.log('Get request');
  const { rows } = await client.query('SELECT * FROM topics;', []);

  response.send(rows);
});

// app.put('/api', async (request, response) => {
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

// app.delete('/api', async (request, response) => {
//   console.log('Delete request');
//   const { id } = request.body;

//   await client.query('DELETE FROM cities WHERE id = $1', [id]);

//   const { rows } = await client.query(
//     'SELECT * FROM cities ORDER BY name ASC',
//     []
//   );

//   response.send(rows);
// });

// app.post('/api', async (request, response) => {
//   console.log('Post request');
//   const { name, population } = request.body;

//   try {
//     await client.query(
//       'INSERT INTO cities (name, population) VALUES ($1, $2)',
//       [name, population]
//     );

//     const { rows } = await client.query(
//       'SELECT * FROM cities ORDER BY name ASC',
//       []
//     );

//     response.send(rows);
//   } catch (error) {
//     console.log(error);

//     if (error.code === '23505') {
//       return response.status(400).send('City already exists');
//     }
//   }
// });

// app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Redo på ${port}`);
});
