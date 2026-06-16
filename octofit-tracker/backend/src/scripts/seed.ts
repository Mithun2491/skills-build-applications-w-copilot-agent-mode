import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Workout from '../models/Workout.js';
import Leaderboard from '../models/Leaderboard.js';

/**
 * Seed the octofit_db database with test data.
 */
async function seed() {
  await mongoose.connect('mongodb://localhost:27017/octofit_db');
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Brooks', email: 'ava@example.com', roles: ['member'] },
    { name: 'Noah Patel', email: 'noah@example.com', roles: ['member'] },
    { name: 'Maya Chen', email: 'maya@example.com', roles: ['coach'] },
  ]);

  const teams = await Team.create([
    { name: 'Sprint Squad', description: 'Fast-paced athletes', members: [users[0]._id, users[1]._id] },
    { name: 'Zen Fit', description: 'Balance and mobility team', members: [users[2]._id] },
  ]);

  await Promise.all([
    Workout.create({ name: 'Morning Energy Blast', description: 'A quick full-body circuit for energy.', difficulty: 'medium', durationMinutes: 30, tags: ['circuit', 'full-body', 'morning'] }),
    Workout.create({ name: 'Core Strength Builder', description: 'Focused core and stability routine.', difficulty: 'hard', durationMinutes: 45, tags: ['core', 'strength'] }),
    Workout.create({ name: 'Recovery Stretch Flow', description: 'Gentle stretch sequence to recover.', difficulty: 'easy', durationMinutes: 20, tags: ['stretch', 'recovery'] }),
  ]);

  const activities = await Activity.create([
    { userId: users[0]._id, type: 'Running', durationMinutes: 34, caloriesBurned: 410, date: new Date() },
    { userId: users[1]._id, type: 'Cycling', durationMinutes: 52, caloriesBurned: 650, date: new Date() },
    { userId: users[0]._id, type: 'Yoga', durationMinutes: 28, caloriesBurned: 180, date: new Date() },
    { userId: users[2]._id, type: 'Strength', durationMinutes: 40, caloriesBurned: 520, date: new Date() },
  ]);

  await Leaderboard.create([
    { userId: users[0]._id, score: 1420, rank: 1 },
    { userId: users[1]._id, score: 1285, rank: 2 },
    { userId: users[2]._id, score: 1110, rank: 3 },
  ]);

  console.log('Seed data created:', { users: users.length, teams: teams.length, activities: activities.length });
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB after seeding');
}

seed().catch((error) => {
  console.error('Seed script failed', error);
  process.exit(1);
});
