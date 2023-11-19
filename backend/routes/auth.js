const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkToken } = require('../middlewares/auth');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

router.post('/register', async (req, res) => {
  try {
    const { name, username, mail, password } = req.body;

    const existingUser = await client.query(
      'SELECT * FROM users WHERE username = $1 OR mail = $2',
      [username, mail]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: 'Användarnamn eller lösenord är redan registrerat.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await client.query(
      'INSERT INTO users (username, mail, password, name) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, mail, hashedPassword, name]
    );

    res.status(201).json({ message: 'Användare registrerad.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Serverfel' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await client.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Fel användarnamn.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Fel lösenord.' });
    }

    const token = jwt.sign(
      {
        userId: user.rows[0].user_id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_SECRET
    );

    res.cookie('token', token);
    res.status(200).json({ token, user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Serverfel' });
  }
});

router.post('/validate', async (req, res) => {
  checkToken(req, res);
});

router.get('/logout', async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Utloggad' });
});

module.exports = router;
