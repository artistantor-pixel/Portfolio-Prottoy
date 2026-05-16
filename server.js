import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

app.use(cors());
app.use(express.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.adminUser.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ valid: true });
});

// --- Profile Routes ---
app.get('/api/profile', async (req, res) => {
  const profile = await prisma.profile.findFirst();
  res.json(profile || {});
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  const { heroText, aboutText, email } = req.body;
  const existing = await prisma.profile.findFirst();
  
  if (existing) {
    const updated = await prisma.profile.update({
      where: { id: existing.id },
      data: { heroText, aboutText, email }
    });
    res.json(updated);
  } else {
    const created = await prisma.profile.create({
      data: { heroText, aboutText, email }
    });
    res.json(created);
  }
});

// --- Projects Routes ---
app.get('/api/projects', async (req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } });
  res.json(projects);
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  const newProject = await prisma.project.create({ data: req.body });
  res.json(newProject);
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  const updated = await prisma.project.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(updated);
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  await prisma.project.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

// --- Experience Routes ---
app.get('/api/experience', async (req, res) => {
  const experiences = await prisma.experience.findMany({ orderBy: { id: 'desc' } });
  res.json(experiences);
});

app.post('/api/experience', authenticateToken, async (req, res) => {
  const newExp = await prisma.experience.create({ data: req.body });
  res.json(newExp);
});

app.put('/api/experience/:id', authenticateToken, async (req, res) => {
  const updated = await prisma.experience.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(updated);
});

app.delete('/api/experience/:id', authenticateToken, async (req, res) => {
  await prisma.experience.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

// --- Education Routes ---
app.get('/api/education', async (req, res) => {
  const education = await prisma.education.findMany({ orderBy: { id: 'desc' } });
  res.json(education);
});

app.post('/api/education', authenticateToken, async (req, res) => {
  const newEdu = await prisma.education.create({ data: req.body });
  res.json(newEdu);
});

app.put('/api/education/:id', authenticateToken, async (req, res) => {
  const updated = await prisma.education.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(updated);
});

app.delete('/api/education/:id', authenticateToken, async (req, res) => {
  await prisma.education.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
