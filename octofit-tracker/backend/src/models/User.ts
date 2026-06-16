import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  teamId?: string;
  roles: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  roles: { type: [String], default: ['member'] },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<IUser>('User', userSchema);
