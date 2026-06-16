import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('userId').sort({ rank: 1 });
  res.json(entries);
});

router.get('/top/:count', async (req, res) => {
  const count = Number(req.params.count) || 10;
  const entries = await Leaderboard.find().populate('userId').sort({ rank: 1 }).limit(count);
  res.json(entries);
});

router.post('/', async (req, res) => {
  const entry = new Leaderboard(req.body);
  await entry.save();
  res.status(201).json(entry);
});

router.put('/:id', async (req, res) => {
  const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req, res) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.status(204).send();
});

export default router;
