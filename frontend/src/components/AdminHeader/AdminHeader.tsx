import React from 'react';

import styles from './AdminHeader.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { oswald } from '@/fonts/fonts';


export const AdminHeader: React.FC = () => {
  return (

    <div className={cn(styles.admin_panel)}>
      <div className={cn(styles.header)}>
        <div className={cn(styles.header_wrapper)}>
          <h1 className={cn(oswald.className, styles.header_admin_title)}>Административная панель</h1>
          <div className={cn(styles.admin_header_links)}>
            <Link href={'/admin/panel/products'} className={cn(styles.admin_header_link)}> Продукты </Link>
            <Link href={'/admin/panel/contacts'} className={cn(styles.admin_header_link)}> Контакты </Link>
            <Link href={'/admin/panel/stores'} className={cn(styles.admin_header_link)}> Магазины </Link>
            <Link href={'/admin/panel/sewing'} className={cn(styles.admin_header_link)}> Вышивка </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
