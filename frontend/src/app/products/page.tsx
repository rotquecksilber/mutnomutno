'use client';
import cn from 'classnames';
import styles from './page.module.css';
import { oswald } from '@/fonts/fonts';
import React from 'react';

import { ProductCard } from '@/components/ProductCard/Product';
import { useProducts } from '@/hooks/useProduct';


export default function Products() {
  const { products } = useProducts();

  return (
    <section>
      <div>
        <h1 className={cn(oswald.className, styles.products_title)}>Продукты MUTNO.MUTNO</h1>
        <div className={cn(styles.product_container)}>
          {products.length > 0 ? (
            products
              .filter((product) => product.isActive)
              .map((product) => (
                <div key={product._id} className={styles.product}>
                  <ProductCard product={product} />
                </div>
              ))
          ) : (
            <div>Загрузка...</div>
          )}
        </div>
      </div>
    </section>
  );
}

