import { Schema, model, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: () => new Date() },
});

export default model<ILeaderboard>('Leaderboard', leaderboardSchema);
