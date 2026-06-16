import { Router } from 'express';
import Team from '../models/Team.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json(teams);
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('members');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.json(team);
});

router.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndDelete(req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  res.status(204).send();
});

export default router;
