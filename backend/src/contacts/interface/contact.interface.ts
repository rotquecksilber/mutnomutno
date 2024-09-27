import { Document } from 'mongoose';

export interface Contact extends Document {
  name: string;
  email: string;
  tg: string;
  comment: string;
  note?: string;
}
