import ProductCard from "@/components/card/productCard";
import { IProduct } from "@/Type/product.type";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

const ProductsDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { productId } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products`,
  );
  const data = await res.json();
  const products = data.filter(
    (product: IProduct) => productId === product.category,
  );
  console.log("category name",products);
  return (
    <div className="mt-8">
        <p className="flex gap-3 items-center my-5">
        <Link href="/">হোম</Link>
        <FaAngleRight />
        
       <span>{products[0]?.categoryNameBn}</span>
      </p>
      <div className="flex gap-3 bg-[#FAFCFA] rounded-2xl py-4 px-6">
        <span className="text-4xl">{products[0]?.categoryIcon}</span>
        <div>
          <h2 className="text-xl">{products[0]?.categoryNameBn}</h2>
          <p>{`${products.length}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {products.map((product: IProduct, ind: number) => (
            <Link key={ind} href={`/itemDetails/${product.id}`}>
          <ProductCard  product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsDetails;
