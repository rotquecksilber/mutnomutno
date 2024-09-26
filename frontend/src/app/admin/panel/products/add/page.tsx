'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { Product } from '@/functions/products/product.interface';
import { createProduct } from '@/functions/products/createProduct.function';
import axios from 'axios';
import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import styles from '@/components/AdminUpdateProduct/AdminUpdateProduct.module.css';
import cn from 'classnames';
import { jura } from '@/fonts/fonts';

// Интерфейс для данных, которые отправляются на сервер
type CreateProductDto = Omit<Product, '_id' | 'createdAt' | 'updatedAt' | '__v'>;

export default function CreateProduct() {
  const router = useRouter();

  // Используем react-hook-form для управления формой
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateProductDto>();

  // Функция для преобразования строки в массив
  const parseArray = (input: unknown): string[] => {
    if (typeof input === 'string') {
      // Разделяем по запятой и переносам строки, убирая лишние пробелы
      return input.split(/[,|\n]/).map((item) => item.trim()).filter(Boolean);
    } else if (Array.isArray(input)) {
      return input;
    }
    return [];
  };

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    // Подготовка данных для отправки
    const cleanedData: CreateProductDto = {
      ...data,
      number: Number(data.number),
      price: data.price ? Number(data.price) : 0,
      discount: data.discount ? Number(data.discount) : 0,
      year: data.year ? Number(data.year) : 0,
      composition: parseArray(data.composition),
      size: parseArray(data.size),
      color: parseArray(data.color),
      picture: parseArray(data.picture),
    };

    try {
      await createProduct(cleanedData);
      router.push('/admin/panel/products');
      alert('Продукт успешно добавлен!');
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      if (axios.isAxiosError(error)) {
        console.error('Ответ от сервера:', error.response?.data);
      }
      alert('Ошибка при добавлении продукта');
    }
  };

  return (
    <>
      <AdminHeader />
      <h2 className={styles.form_title}> Добавление продукта </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.update_form)}>
        <div className={cn(styles.update_section)}>
          <label>Название:</label>
          <input
            className={cn(jura.className)}
            type="text"
            {...register('name', { required: 'Введите название' })}
            placeholder="Название продукта"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className={cn(styles.update_section)}>
          <label>Номер:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('number', { required: 'Введите номер продукта' })}
            placeholder="Номер продукта"
          />
          {errors.number && <span>{errors.number.message}</span>}
        </div>

        <div className={cn(styles.update_section)}>
          <label>Цена:</label>
          <input
            className={cn(jura.className)}
            type="number"
            {...register('price', { required: 'Введите цену продукта' })}
            placeholder="Цена продукта"
          />
          {errors.price && <span>{errors.price.message}</span>}
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
            {...register('year', { required: 'Введите год' })}
            placeholder="Год"
          />
          {errors.year && <span>{errors.year.message}</span>}
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
            type="checkbox"
            {...register('isActive')}
          />
        </div>

        <button type="submit" disabled={isSubmitting} className={cn(styles.button)}>
      Добавить
        </button>
      </form>
    </>
  )
  ;
}
