const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  console.log('File uploaded');
  const { id } = req.body;
  res.send();
  sharp(req.file.path)
    .resize({ width: 100 })
    .toFile('uploads/avatar' + id + '.jpg');
});

router.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(process.cwd(), 'uploads', filename);
  res.set('Content-Type', 'image/jpeg');
  res.sendFile(imagePath);
});

module.exports = router;
