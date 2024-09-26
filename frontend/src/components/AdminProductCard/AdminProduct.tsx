import React from 'react';
import { Product } from '@/functions/products/product.interface';
import styles from './AdminProduct.module.css';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const AdminProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <div className={cn(styles.product_card)}>
      <Link href={`${siteUrl}/admin/panel/products/${product.number}`} className={cn(styles.product_link)}>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Фото</p>
          <Image src={product.picture[0]} alt={product.name} width={50} height={50} priority={true} />
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Название</p>
          <div className={cn(styles.product_content)}>
            {product.name}
          </div>
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Номер</p>
          <div className={cn(styles.product_content)}>{product.number}</div>
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Цена</p>
          <div className={cn(styles.product_content)}>{product.price} руб.</div>
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Цвет</p>
          <div className={cn(styles.product_content)}>{product.color.join(', ')}</div>
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Размер</p>
          <div className={cn(styles.product_content)}>{product.size.join(', ')}</div>
        </div>
        <div className={cn(styles.product_div)}>
          <p className={cn(styles.product_p)}>Активность</p>
          <div className={cn(styles.product_content)}>{product.isActive ? 'Да' : 'Нет'}</div>
        </div>
      </Link>
    </div>
  );
};

