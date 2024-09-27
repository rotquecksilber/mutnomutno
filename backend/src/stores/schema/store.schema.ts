import { Schema } from 'mongoose';

import { Store } from '../interface/store.interface';

export const StoreSchema = new Schema<Store>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);
