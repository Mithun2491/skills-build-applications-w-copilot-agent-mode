import mongoose from 'mongoose';

const DB_NAME = 'octofit_db';
export const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`;

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI);
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export default mongoose;
export { mongoose, DB_NAME, MONGO_URI };
