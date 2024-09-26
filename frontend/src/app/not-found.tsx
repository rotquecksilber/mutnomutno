import styles from './page.module.css';
import cn from 'classnames';
import { jura } from '@/fonts/fonts';
export default function NotFound() {
  return (
    <div className={styles.not_found}>
      <h1 className={cn(styles.home_title_not_found, jura.className)}>404 | Такой страницы нет</h1>
    </div>
  );
}
