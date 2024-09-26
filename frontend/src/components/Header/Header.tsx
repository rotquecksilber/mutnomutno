
import React from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { MobileMenu } from '@/components/MobileMenu/MobileMenu';


export const Header = (): React.JSX.Element => {

  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.header_wrapper)}>
        <MobileMenu />
        {/*Menu*/}
        <div className={cn(styles.header_menu)}>
          <Link href={'/products'} className={cn(styles.header_link)}>Продукты</Link>
          <Link href={'/sewing'} className={cn(styles.header_link)}>Вышивка</Link>
        </div>

        {/*Logo*/}
        <div>
          <Link href={'/'} >
            <Image src={'/logo.png'} alt={'MUTNO.MUTNO'} width={150} height={25} priority={true}/>
          </Link>
        </div>

        {/*Where to buy*/}
        <div className={cn(styles.header_stores)}>
          <Link href={'/buy'} className={cn(styles.header_link)}>Приобрести</Link>
        </div>

      </div>
    </header>
  );
};
