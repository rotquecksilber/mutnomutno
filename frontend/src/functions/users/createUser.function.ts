import axios from 'axios';
import { CreateUser } from '@/functions/users/user.interface';

export default async function createUser(user: CreateUser ): Promise<void> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/signup`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

