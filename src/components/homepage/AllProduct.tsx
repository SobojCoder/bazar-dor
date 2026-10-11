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
    <div className="mt-6 sm:mt-8">
      <div id="allProduct" >
      <h2 className="text-xl sm:text-2xl font-bold my-2">
        সব পণ্য
      </h2>

      <p className="text-sm sm:text-base text-[#7C837D] mb-4">
        {`মোট ${Products.length} টি পণ্য দেখানো হচ্ছে`}
      </p>

      <div id="সব-পণ্য" className="mt-6 sm:mt-8 scroll-mt-4">
  {/* heading + count unchanged */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
    {Products.map((product: IProduct) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>
      </div>
    </div>
  );
};

export default AllProduct;