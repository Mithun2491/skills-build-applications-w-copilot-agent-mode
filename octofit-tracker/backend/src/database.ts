import mongoose from 'mongoose';

const MONGO_HOST = 'localhost';
const MONGO_PORT = 27017;
const MONGO_DB = 'octofit_db';

export const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI, mongooseOptions);
}

export async function disconnectDatabase() {
  return mongoose.disconnect();
}

export { mongoose };
export default mongoose;
