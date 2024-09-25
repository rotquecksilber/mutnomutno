import { Document } from 'mongoose';

// Определяем интерфейс для продукта
export interface Product extends Document {
  name: string;
  number: number;
  price: number;
  discount?: number;
  composition: string[];
  size: string[];
  color: string[];
  year: number;
  description1: string;
  description2?: string;
  description3?: string;
  picture: string[];
  isActive?: boolean;
}
