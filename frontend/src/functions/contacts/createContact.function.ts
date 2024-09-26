import axios from 'axios';
import { CreateContact } from '@/functions/contacts/contact.interface';

export default async function createContact(contact: CreateContact ): Promise<void> {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, contact);
    return response.data;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
}
