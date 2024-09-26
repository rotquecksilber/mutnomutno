
import { Product } from '@/functions/products/product.interface';
import axios from 'axios';
import UpdateProduct from '@/components/AdminUpdateProduct/AdminUpdateProduct';


export async function generateStaticParams() {
  const res = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL_LINUX}/product`);
  const products = res.data;

  return products.map((product) => ({
    number: product.number.toString(),
  }));
}

interface UpdateProductPageProps {
  params: { number: string };
}

export default function UpdateProductPage({ params }: UpdateProductPageProps) {
  return <UpdateProduct params={params} />;
}
