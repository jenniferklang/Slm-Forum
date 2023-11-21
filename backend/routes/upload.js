const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
  console.log("File uploaded");
  console.log(req.file);
  res.send();
});

router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log(filename);

  const imagePath = path.join(process.cwd(), "uploads", filename);
  res.set("Content-Type", "image/jpeg");
  res.sendFile(imagePath);
});

module.exports = router;
