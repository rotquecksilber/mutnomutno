import { Schema } from 'mongoose';
import { Product } from '../interface/product.interface';

export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: false },
    composition: { type: [String], required: true },
    size: { type: [String], required: true },
    color: { type: [String], required: true },
    year: { type: Number, required: true },
    description1: { type: String, required: true },
    description2: { type: String, required: false },
    description3: { type: String, required: false },
    picture: { type: [String], required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);
