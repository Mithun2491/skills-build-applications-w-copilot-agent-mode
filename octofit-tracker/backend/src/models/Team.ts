import { Schema, model, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
});

export default model<ITeam>('Team', teamSchema);
