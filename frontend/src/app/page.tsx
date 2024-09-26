import cn from 'classnames';
import { oswald } from '@/fonts/fonts';
import styles from './page.module.css';
import Image from 'next/image';



export default function Home() {
  return (
    <div className={cn(styles.home)}>
      <section className={cn(styles.home_section)}>
        <h1 className={cn(oswald.className, styles.home_title)}>MUTNO.MUTNO</h1>
        <div className={cn(styles.home_block)}>

          <div className={cn(styles.home_block__wrapper)}>

            <div>
              <Image
                className={cn(styles.home_block__image)}
                alt={'Change'}
                src={'/home.jpg'}
                width={100}
                height={40}
                style={{ width: '100%', height: '50px' }}
              />
            </div>

            <div className={cn(styles.home_block__text)}>

              Я собираю воедино свое вдохновение, цели и интересы в один проект MUTNO.MUTNO<br /><br />
              Название произошло от первого айтема - свитера «OMUT».<br /><br />
              Каждый предмет, созданный мной в рамках проекта, является своего рода экспериментом и
              уникальным<br />
              экспонатом, существующим в единичном экземпляре.

            </div>

          </div>

          <div>
            <Image className={cn(styles.home_gif)} src={'/my.jpg'} alt={'Change'} width={1280} height={848} priority={true}></Image>
          </div>
        </div>
      </section>
    </div>
  );
}
