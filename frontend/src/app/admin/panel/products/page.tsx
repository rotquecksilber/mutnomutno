'use client';
import ProtectedRoute from '@/components/HOC/ProtectedRoute';
import React from 'react';
import cn from 'classnames';


import styles from './page.module.css';
import { useProducts } from '@/hooks/useProduct';
import { AdminProductCard } from '@/components/AdminProductCard/AdminProduct';

import { AdminHeader } from '@/components/AdminHeader/AdminHeader';
import Link from 'next/link';
import { jura } from '@/fonts/fonts';


function AdminProducts() {
  const { products, loading, error } = useProducts();

  return (
    <>
      <AdminHeader/>
      <section className={cn(styles.admin_products)}>

        <h2 className={cn(styles.admin_products_title)}>Управление продуктами</h2>
        {loading && <div className={cn(styles.admin_products_system)}>Загрузка...</div>}
        {error && <div className={cn(styles.admin_products_system)}>{error}</div>}
        <div className={cn(styles.product_container)}>
          {products
            .map((product) => (
              <div key={product._id} className={styles.product}>
                <AdminProductCard product={product} />
              </div>
            ))}
        </div>
        <Link href={'/admin/panel/products/add'}>
          <button className={cn(styles.new_product_button, jura.className)}>НОВЫЙ ПРОДУКТ</button>
        </Link>
      </section>
    </>
  );
}

export default ProtectedRoute(AdminProducts);
