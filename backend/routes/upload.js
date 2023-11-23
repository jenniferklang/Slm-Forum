const express = require("express");
const router = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.PGURI,
});
client.connect();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const storage = multer.memoryStorage();

const filter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

const upload = multer({ storage: storage, fileFilter: filter });

router.post("/upload", upload.single("image"), async (req, res) => {
  const { id } = req.body;

  await sharp(req.file.buffer)
    .resize({ width: 100 })
    .toFile("uploads/avatar" + id + ".jpg");

  await client.query("UPDATE users SET image_path = $1 WHERE user_id = $2", [
    "api/uploads/avatar",
    id,
  ]);

  res.send("Uppladdad!");
});

router.get("/avatar", (req, res) => {
  try {
    const id = req.userId;
    const filename = "avatar" + id + ".jpg";

    const imagePath = path.join(process.cwd(), "uploads", filename);
    res.set("Content-Type", "image/jpeg");
    res.sendFile(imagePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Fel vid hämtning av avatar." });
  }
});

module.exports = router;
