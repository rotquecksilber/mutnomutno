import React from 'react';
import { Product } from '@/functions/products/product.interface';
import styles from './Product.module.css';
import cn from 'classnames';
import { oswald } from '@/fonts/fonts';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <div className={cn(styles.product_card)}>
      <Link href={`${siteUrl}/products/${product.number}`} className={cn(styles.product_link)}>
        <div className={cn(styles.product_pictures)}>
          <Image src={product.picture[0]} alt={product.name} width={250} height={250} priority={true} />
        </div>
        <h2 className={cn(styles.product_title, oswald.className)}>
        №{product.number} {product.name}
        </h2>
        <div className={cn(styles.product_price)}>
          {product.price} руб.
        </div>
      </Link>
    </div>
  );
};
