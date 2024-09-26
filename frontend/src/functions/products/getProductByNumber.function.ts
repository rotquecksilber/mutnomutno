import { Product } from '@/functions/products/product.interface';
import axios from 'axios';

export const fetchProductByNumber = async (number: string): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL_LINUX}/product/${number}`, {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};

export const fetchProductByNumberOld = async (number: string): Promise<Product | null> => {
  try {
    const response = await axios.get<Product>(`${process.env.NEXT_PUBLIC_API_URL}/product/${number}`, {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};

