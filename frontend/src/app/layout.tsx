import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Header } from '@/components/Header/Header';
import { jura } from '@/fonts/fonts';
import { Footer } from '@/components/Footer/Footer';
import styles from './layout.module.css';



export const metadata: Metadata = {
  title: 'Проект MUTNO.MUTNO',
  description: 'Каждый предмет - эксперимент и уникальный экспонат, который существует в единичном экземпляре',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={jura.className}>
        <div className={styles.pageContainer}>
          <Header />
          <main className={styles.main}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
