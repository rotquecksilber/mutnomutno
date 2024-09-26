
import axios from 'axios';
import { AccessToken, SigninUser } from '@/functions/users/user.interface';

export default async function signinUser(user: SigninUser): Promise<AccessToken> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/signin`, user);
    const { access_token } = response.data; // Получаем токен из ответа

    if (access_token) {
      localStorage.setItem('token', access_token); // Сохраняем токен в localStorage
    }

    return response.data;
  } catch (error) {
    console.error('Error with enter:', error);
    throw error;
  }
}
