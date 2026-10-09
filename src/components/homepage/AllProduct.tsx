import React from 'react';
import DescreaseProductCard from '../card/productCard';
import Link from 'next/link';
import { IProduct } from '@/Type/product.type';

const AllProduct = async() => {
 "use cache";
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const Products = await res.json();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold my-2">সব পণ্য</h2>
      <p className="text-[#7C837D] mb-4">{`মোট ${Products.length} টি পণ্য দেখানো হচ্ছে`}</p>
      <Link href={`datailProduct/${Products.id}`}>
      <div className="grid grid-cols-3 gap-5">
        {Products.map((product: IProduct) => (
          <DescreaseProductCard key={product.id} product={product} />
        ))}
      </div>
      </Link>
    </div>
  );
};

export default AllProduct;