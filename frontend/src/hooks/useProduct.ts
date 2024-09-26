import { useEffect, useState } from 'react';
import { Product } from '@/functions/products/product.interface';
import getProducts from '@/functions/products/getProducts.function';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Ошибка загрузки продуктов');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts().catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []);

  return { products, loading, error };
};
