import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import styles from './ProtectedRoute.module.css';

// Интерфейс для структуры данных токена JWT
interface DecodedToken {
  exp: number; // Время истечения токена в формате Unix Timestamp
}

const ProtectedRoute = <P extends object>(WrappedComponent: React.FC<P>) => {
  return function Protected(props: P) { // Используем дженерик P для типизации пропсов
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        // Если токен отсутствует, перенаправляем и останавливаем загрузку
        router.push('/admin');
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Текущее время в формате Unix Timestamp

        if (decoded.exp < currentTime) {
          // Если токен истек, удаляем его и перенаправляем
          localStorage.removeItem('token');
          router.push('/admin');
        } else {
          // Если токен валиден, снимаем состояние загрузки
          setLoading(false);
        }
      } catch (error) {
        // Если произошла ошибка при декодировании, перенаправляем на вход
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        router.push('/admin');
      }
    }, [router]);

    // Показать спиннер или пустую страницу пока идет проверка
    if (loading) {
      return <div className={styles.loading}>Загрузка...</div>;
    }

    // Если токен валиден, рендерим защищенный компонент
    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
