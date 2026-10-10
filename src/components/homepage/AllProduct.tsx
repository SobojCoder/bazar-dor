import React from "react";
import Link from "next/link";
import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";

const AllProduct = async () => {
  "use cache";
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const Products = await res.json();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold my-2">সব পণ্য</h2>
      <p className="text-[#7C837D] mb-4">{`মোট ${Products.length} টি পণ্য দেখানো হচ্ছে`}</p>
        <div className="grid grid-cols-3 gap-5">
          {Products.map((product: IProduct) => {
            return (
              <div key={product.id}>  
                <Link href={`/itemDetails/${product.id}`}>
                  <ProductCard key={product.id} product={product} />
                </Link>
              </div>  
            );
          })}
        </div>
    </div>
  );
};

export default AllProduct;
