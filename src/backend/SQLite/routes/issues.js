const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const db = require("../../db");

const router = express.Router();
const SECRET = "1234"; 

function auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Token lipsă" });

  jwt.verify(token.split(" ")[1], SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token invalid" });
    req.user = decoded;
    next();
  });
}

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/", auth, upload.single("image"), (req, res) => {
  const { title, description } = req.body;
  const imagePath = req.file ?` /uploads/${req.file.filename}` : null;

  db.run("INSERT INTO issues (title, description, image_path, user_id) VALUES (?, ?, ?, ?)",
    [title, description, imagePath, req.user.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, title, description, imagePath, votes: 0, status: "nou" });
    }
  );
});

router.get("/", (req, res) => {
  db.all("SELECT * FROM issues ORDER BY votes DESC", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/:id/vote", auth, (req, res) => {
  const id = req.params.id;
  db.run("UPDATE issues SET votes = votes + 1 WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
});

// Schimbă status (doar pentru demo, oricine poate)
router.put("/:id/status", auth, (req, res) => {
  const { status } = req.body;
  db.run("UPDATE issues SET status = ? WHERE id = ?", [status, req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true, status });
  });
});

module.exports = router;