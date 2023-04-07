import { Schema, model } from 'mongoose';
import { User } from '../../interfaces/User';

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export default model<User>('User', UserSchema);
