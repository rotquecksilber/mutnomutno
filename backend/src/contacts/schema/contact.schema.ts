import { Schema } from 'mongoose';
import { Contact } from '../interface/contact.interface';

export const ContactSchema = new Schema<Contact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tg: { type: String, required: true },
    comment: { type: String, required: true },
    note: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);
