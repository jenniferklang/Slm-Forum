const express = require("express");
const bodyParser = require("body-parser");
// const path = require('path');

// Importera routes här
const auth = require("./routes/auth");
const api = require("./routes/api");

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Och säg till appen att använda dem här
app.use("/api/auth", auth);
app.use("/api", api);

// app.use(express.static(path.join(path.resolve(), 'dist')));

app.listen(port, () => {
  console.log(`Redo på ${port}`);
});
