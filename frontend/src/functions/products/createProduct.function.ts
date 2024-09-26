import type { Product } from './product.interface';
import apiClient from '../../../configs/axios.config';

export const createProduct = async (product: Omit<Product, '_id' | 'createdAt' | 'updatedAt' | '__v'>) => {
  try {
    const response = await apiClient.post(`${process.env.NEXT_PUBLIC_API_URL}/product`, product);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании продукта:', error);
    throw error;
  }
};
