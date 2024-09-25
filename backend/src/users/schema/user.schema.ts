import { Schema } from 'mongoose';
import { User } from '../interface/user.interface';

export const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },
});
