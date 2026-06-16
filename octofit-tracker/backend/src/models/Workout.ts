import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  difficulty: string;
  durationMinutes: number;
  tags: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<IWorkout>('Workout', workoutSchema);
