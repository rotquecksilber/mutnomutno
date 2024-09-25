import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'user';
}
