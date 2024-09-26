'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './MobileMenu.module.css';
import cn from 'classnames';
import Link from 'next/link';

export const MobileMenu = (): React.JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Создаём реф для контейнера

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Закрываем меню при клике на ссылку
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false); // Закрываем меню при клике вне него
    }
  }, [menuOpen]); // Теперь у нас есть зависимость

  useEffect(() => {
    // Добавляем слушатель событий на клик
    document.addEventListener('click', handleClickOutside);

    // Убираем слушатель при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]); // Используем мемоизированную функцию

  return (
    <div ref={menuRef} className={styles.mobileMenuContainer}>
      <button className={cn(styles.burger_menu)} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </button>

      {menuOpen && (
        <div className={cn(styles.header_menu, { [styles['header_menu__open']]: menuOpen })}>
          <Link href={'/products'} className={cn(styles.header_link)} onClick={handleLinkClick}>
            Продукты
          </Link>
          <Link href={'/sewing'} className={cn(styles.header_link)} onClick={handleLinkClick}>
            Вышивка
          </Link>
        </div>
      )}
    </div>
  );
};
