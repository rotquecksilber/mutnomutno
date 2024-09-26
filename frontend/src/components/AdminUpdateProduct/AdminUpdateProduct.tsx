'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { UpdateProduct } from '@/functions/products/product.interface';
import { updateProductFunction } from '@/functions/products/updateProduct.function';
import { fetchProductByNumberOld } from '@/functions/products/getProductByNumber.function';
import { deleteProductByNumber } from '@/functions/products/deleteProduct.function'; // Импорт функции удаления
import axios from 'axios';
import styles from './AdminUpdateProduct.module.css';
import cn from 'classnames';
import { jura } from '@/fonts/fonts';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';

interface UpdateProductProps {
  params: { number: string };
}

export default function UpdateProduct({ params }: UpdateProductProps) {
  const { number } = params;
  const [initialValues, setInitialValues] = useState<UpdateProduct | null>(null);
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<UpdateProduct>();

  useEffect(() => {
    async function fetchProduct() {
      const product = await fetchProductByNumberOld(number);
      if (product) {
        setInitialValues(product);
        Object.keys(product).forEach((key) => {
          const value = product[key as keyof UpdateProduct];
          // Преобразуем массивы в строку с пробелом после запятой
          if (Array.isArray(value)) {
            setValue(key as keyof UpdateProduct, value.join(', '));
          } else {
            setValue(key as keyof UpdateProduct, value);
          }
        });
      }
    }

    fetchProduct().catch((error) => {
      console.error('Ошибка при вызове fetchProduct:', error);
    });
  }, [number, setValue]);

  const parseArray = (input: unknown): string[] => {
    if (typeof input === 'string') {
      // Разделяем по запятой и переносам строки, убирая лишние пробелы
      return input.split(/[,|\n]/).map((item) => item.trim()).filter(Boolean);
    } else if (Array.isArray(input)) {
      return input;
    }
    return [];
  };

  const onSubmit: SubmitHandler<UpdateProduct> = async (data) => {
    const cleanedData = {
      ...data,
      number: Number(data.number),
      discount: data.discount ? Number(data.discount) : 0,
      price: data.price ? Number(data.price) : 0,
      year: data.year ? Number(data.year) : 0,
      composition: parseArray(data.composition as unknown as string),
      size: parseArray(data.size as unknown as string),
      color: parseArray(data.color as unknown as string),
      picture: parseArray(data.picture as unknown as string),
    };

    try {
      await updateProductFunction(number, cleanedData);
      router.push('/admin/panel/products');
      alert('Продукт успешно обновлен!');
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      if (axios.isAxiosError(error)) {
        console.error('Ответ от сервера:', error.response?.data);
      }
      alert('Ошибка при обновлении продукта');
    }
  };

  // Функция удаления продукта
  const handleDelete = useCallback(async () => {
    const isConfirmed = window.confirm('Вы уверены, что хотите удалить этот продукт?');

    if (!isConfirmed) {
      // Если пользователь нажал "Отмена", просто возвращаемся и ничего не делаем
      return;
    }

    try {
      await deleteProductByNumber(number);
      alert('Продукт успешно удален!');
      router.push('/admin/panel/products');
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      alert('Ошибка при удалении продукта');
    }
  }, [number, router]);

  if (!initialValues) return <p>Загрузка...</p>;

  return (
    <>
      <AdminHeader/>
      <h2 className={styles.form_title}> Изменение продукта </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.update_form)}>
        <div className={cn(styles.update_section)}>
          <label>Название:</label>
          <input
            className={cn(jura.className)}
            type="text"
            {...register('name')}
            placeholder="Название продукта"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Номер:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('number')}
            placeholder="Номер продукта"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Цена:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('price')}
            placeholder="Цена продукта"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Скидка:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('discount')}
            placeholder="Скидка"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Состав:</label>
          <input
            className={cn(jura.className)}
            type="text"
            {...register('composition')}
            placeholder="Состав (через запятую)"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Размер:</label>
          <input
            className={cn(jura.className)}
            type="text"
            {...register('size')}
            placeholder="Размер (через запятую)"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Цвет:</label>
          <input
            className={cn(jura.className)}
            type="text"
            {...register('color')}
            placeholder="Цвет (через запятую)"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Год:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('year')}
            placeholder="Год"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Описание:</label>
          <textarea
            className={cn(jura.className)}
            {...register('description1')}
            placeholder="Описание продукта"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Описание 2:</label>
          <textarea
            className={cn(jura.className)}
            {...register('description2')}
            placeholder="Описание 2"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Описание 3:</label>
          <textarea
            className={cn(jura.className)}
            {...register('description3')}
            placeholder="Описание 3"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Картинки:</label>
          <textarea
            className={cn(jura.className, styles.pictures)}
            {...register('picture')}
            placeholder="Ссылки на картинки (через запятую или Enter)"
          />
        </div>

        <div className={cn(styles.update_section)}>
          <label>Активен:</label>
          <input
            className={cn(jura.className)}
            type="checkbox"
            {...register('isActive')}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className={cn(styles.button)}>
          Изменить
        </button>
        <button type="button" onClick={handleDelete} className={cn(styles.button, styles.delete_button)}>
          Удалить продукт
        </button>
      </form>
    </>
  );
}
