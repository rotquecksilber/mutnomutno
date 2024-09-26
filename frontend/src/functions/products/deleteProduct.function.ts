
import apiClient from '../../../configs/axios.config';

export const deleteProductByNumber = async (number: string): Promise<void> => {
  const confirmed = window.confirm('Вы уверены, что хотите удалить этот продукт?');

  if (!confirmed) return;

  try {
    await apiClient.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/delete/${number}`);
    alert('Продукт успешно удален!');
  } catch (error) {
    console.error('Ошибка при удалении продукта:', error);
    alert('Ошибка при удалении продукта');
    throw error;
  }
};
