import axios from 'axios';

// Создаем экземпляр axios
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Устанавливаем базовый URL для всех запросов
});

// Добавляем интерсептор для установки токена в заголовки
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
