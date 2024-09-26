import axios from 'axios';

export default async function getProducts() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

