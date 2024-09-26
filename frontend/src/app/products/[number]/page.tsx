import axios from 'axios';
import { Product } from '@/functions/products/product.interface';
import { notFound } from 'next/navigation';
import cn from 'classnames';
import { oswald } from '@/fonts/fonts';
import styles from './page.module.css';
import CustomCarousel from '@/components/Swiper/Swiper';
import { fetchProductByNumber } from '@/functions/products/getProductByNumber.function';
import { Metadata } from 'next';

export async function generateStaticParams() {
  try {
    const res = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL_LINUX}/product`);
    const products = res.data;

    return products.map((product) => ({
      number: product.number.toString(),
    }));
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    return [];
  }
}

export interface ProductPageProps {
  params: { number: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { number } = params;
  try {
    const product = await fetchProductByNumber(number);

    if (!product) {
      return {
        title: 'Продукт не найден',
        description: 'Запрашиваемый продукт не существует.',
      };
    }

    return {
      title: `№${product.number} - ${product.name} | MUTNO.MUTNO`,
      description: `№${product.number} ${product.name} - ${product.description1 || 'Уникальный продукт MUTNO.MUTNO'}.`,
    };
  } catch (error) {
    console.error('Ошибка при получении метаданных продукта:', error);
    return {
      title: 'Ошибка',
      description: 'Произошла ошибка при получении данных о продукте.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { number } = params;

  try {
    const product = await fetchProductByNumber(number);

    if (!product) {
      return notFound();
    }

    return (
      <section className={cn(styles.product)}>
        <div className={cn(styles.product_container)}>
          <div className={styles.product_image}>
            <CustomCarousel pictures={product.picture} />
          </div>
          <div className={cn(styles.product_details)}>
            <div>
              <h1 className={cn(oswald.className, styles.product_title)}>
                №{product.number} {product.name}
              </h1>
              <p>Цена: {product.price} руб.</p>
              <p>Размер: {product.size.join(', ')}</p>
              <p>Цвет: {product.color.join(', ')}</p>
              <br />
              <p>{product.description1}</p> <br />
              <p>{product.description2}</p>
              <br />
              <p>{product.description3}</p>
            </div>
          </div>
        </div>
        <div className={cn(styles.product_description)}></div>
      </section>
    );
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return (
      <p>Ошибка при загрузке продукта. Пожалуйста, попробуйте позже.</p>
    );
  }
}
