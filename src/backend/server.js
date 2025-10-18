import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Secret JWT (în producție folosește .env)
const JWT_SECRET = 'supersecretkey';

// Multer upload imagini
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Conectare SQLite
const db = await open({ filename: './data.db', driver: sqlite3.Database });

// Creare tabele dacă nu există
await db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT
);

CREATE TABLE IF NOT EXISTS issues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  tag TEXT,
  image_path TEXT,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
`);

// Middleware JWT
function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // {id, email}
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// ✅ REGISTER
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Completează toate câmpurile!' });

  const hashed = await bcrypt.hash(password, 10);
  try {
    await db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashed
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email deja folosit sau eroare server' });
  }
});

// ✅ LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Completează toate câmpurile!' });

  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.status(401).json({ error: 'Email sau parola greșită' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Email sau parola greșită' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, name: user.name, email: user.email });
});

// ✅ ADD ISSUE (autentificat)
app.post('/issues', auth, upload.single('image'), async (req, res) => {
  const { title, description, tag } = req.body;
  const image_path = req.file ? req.file.path : null;

  if (!title || !description || !tag)
    return res.status(400).json({ error: 'Completează toate câmpurile!' });

  await db.run(
    'INSERT INTO issues (title, description, tag, image_path, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, description, tag, image_path, req.user.id]
  );

  res.json({ success: true });
});

// ✅ GET ISSUES
app.get('/issues', async (req, res) => {
  const issues = await db.all(
    `SELECT issues.*, users.name as author FROM issues
     LEFT JOIN users ON issues.user_id = users.id
     ORDER BY issues.id DESC`
  );
  res.json(issues);
});

// Servește imaginile
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
