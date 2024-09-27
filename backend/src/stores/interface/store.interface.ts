import { Document } from 'mongoose';

// Определяем интерфейс для продукта
export interface Store extends Document {
  name: string;
  description: string;
  link: string;
  isActive?: boolean;
}
