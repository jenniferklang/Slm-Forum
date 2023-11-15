const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./middlewares/auth');
// const path = require('path');

// Importera routes här
const auth = require('./routes/auth');
const api = require('./routes/api');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authenticateToken);

// Och säg till appen att använda dem här
app.use('/api/auth', auth);
app.use('/api', api);

app.listen(port, () => {
  console.log(`Redo på ${port}`);
});
