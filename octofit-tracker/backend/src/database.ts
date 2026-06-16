import mongoose from 'mongoose';

export const MONGO_URI = 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI);
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export { mongoose };
