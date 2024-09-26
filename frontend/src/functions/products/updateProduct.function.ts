import { UpdateProduct } from '@/functions/products/product.interface';

import apiClient from '../../../configs/axios.config';

export const updateProductFunction = async (number: string, data: UpdateProduct): Promise<void> => {
  try {
    await apiClient.put(`${process.env.NEXT_PUBLIC_API_URL}/product/${number}`, data);
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error);
    throw error;
  }
};
