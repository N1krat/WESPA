const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const db = require("../../db");

const router = express.Router();
const SECRET = "123456"; // folosit și la autentificare JWT

//  auth
function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Token lipsă" });

  jwt.verify(token.split(" ")[1], SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token invalid" });
    req.user = decoded;
    next();
  });
}

//  Configurare multer pentru upload imagini
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

//  Creare problemă (cu opțional image și coordonate)
router.post("/", auth, upload.single("image"), (req, res) => {
  const { title, description, latitude, longitude } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const userId = req.user.id;

  if (!title || !description) {
    return res.status(400).json({ error: "Title și description sunt obligatorii" });
  }

  db.run(
    `INSERT INTO issues (title, description, image_path, latitude, longitude, user_id, votes, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, 'nou', CURRENT_TIMESTAMP)`,
    [title, description, imagePath, latitude || null, longitude || null, userId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({
        id: this.lastID,
        title,
        description,
        imagePath,
        latitude: latitude || null,
        longitude: longitude || null,
        votes: 0,
        status: "nou"
      });
    }
  );
});

//  Listare probleme (pt hartă și tabel)
router.get("/", (req, res) => {
  db.all("SELECT * FROM issues ORDER BY votes DESC, created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//  Vot pentru problemă
router.post("/:id/vote", auth, (req, res) => {
  const id = req.params.id;
  db.run("UPDATE issues SET votes = votes + 1 WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

//  Schimbare status problemă (ex. nou, in progress, rezolvat)
router.put("/:id/status", auth, (req, res) => {
  const { status } = req.body;
  db.run("UPDATE issues SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, status });
  });
});

module.exports = router;
