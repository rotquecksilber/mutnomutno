import React from 'react';
import styles from './Footer.module.css';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = (): React.JSX.Element => {
  const date = new Date().getFullYear();

  return (
    <footer className={cn(styles.footer)}>
      <div className={styles.footer_wrapper}>
        <p>© {date} MUTNO.MUTNO. Все права защищены.</p>
        <div className={styles.footer_links}>
          <Link rel={'nofollow noindex'} target="_blank" href={'https://t.me/mutno_mutno'}>
            <Image alt={'Телеграм'} src={'/telegram.svg'} width={25} height={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
