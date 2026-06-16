import { Router } from 'express';
import Activity from '../models/Activity.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('userId');
  res.json(activities);
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('userId');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

router.put('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

router.delete('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.status(204).send();
});

export default router;
