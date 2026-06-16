/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/User.ts';
import Team from '../models/Team.ts';
import Activity from '../models/Activity.ts';
import Workout from '../models/Workout.ts';
import Leaderboard from '../models/Leaderboard.ts';

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  await mongoose.connect(mongodbUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Brooks', email: 'ava.brooks@example.com', roles: ['member'] },
    { name: 'Noah Patel', email: 'noah.patel@example.com', roles: ['member'] },
    { name: 'Maya Chen', email: 'maya.chen@example.com', roles: ['coach'] },
  ]);

  const teams = await Team.insertMany([
    { name: 'Sprint Squad', description: 'High-energy pace team', members: [users[0]._id.toString(), users[1]._id.toString()] },
    { name: 'Zen Fit', description: 'Recovery and flexibility focus', members: [users[2]._id.toString()] },
  ]);

  await Workout.create([
    { name: 'Morning Energy Blast', description: 'Full body warmup and cardio burst', difficulty: 'medium', durationMinutes: 30, tags: ['cardio', 'warmup'] },
    { name: 'Core Strength Builder', description: 'Focused abs and stability', difficulty: 'hard', durationMinutes: 45, tags: ['strength', 'core'] },
    { name: 'Recovery Stretch Flow', description: 'Gentle mobility and stretch', difficulty: 'easy', durationMinutes: 20, tags: ['stretch', 'mobility'] },
  ]);

  await Activity.insertMany([
    { userId: users[0]._id.toString(), type: 'Running', durationMinutes: 50, caloriesBurned: 410, date: new Date() },
    { userId: users[1]._id.toString(), type: 'Cycling', durationMinutes: 70, caloriesBurned: 650, date: new Date() },
    { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 40, caloriesBurned: 180, date: new Date() },
    { userId: users[0]._id.toString(), type: 'Strength', durationMinutes: 55, caloriesBurned: 520, date: new Date() },
  ]);

  await Leaderboard.insertMany([
    { userId: users[0]._id.toString(), score: 1420, rank: 1 },
    { userId: users[1]._id.toString(), score: 1285, rank: 2 },
    { userId: users[2]._id.toString(), score: 1110, rank: 3 },
  ]);

  console.log('Seeded octofit_db with test data');
  await mongoose.disconnect();
}

seedDatabase().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});