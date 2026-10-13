import ProductCard from "@/components/card/productCard";
import SortDropdown from "@/components/ProductDropdown";
import { IProduct } from "@/Type/product.type";
import { toBn } from "@/utills/numEngToBn";
import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

const ProductsDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { productId } = await params;

  const { sort = "default" } = await searchParams;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products`,
  );
  const data = await res.json();
  const products = data.filter(
    (product: IProduct) => productId === product.category,
  );

  // ক্যাটাগরি না পেলে বা কোনো পণ্য না থাকলে 404-style বার্তা
  if (products.length === 0) {
    return (
      <div className="mt-10 sm:mt-16 lg:mt-20 flex w-full flex-col items-center rounded-2xl bg-[#FAFCFA] px-4 py-10 text-center sm:py-14">
        <span className="text-5xl sm:text-6xl" aria-hidden="true">
          🛒
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-[#05893E] sm:text-5xl">
          ৪০৪
        </h1>
        <h2 className="mt-2 text-lg font-bold text-gray-900 sm:text-2xl">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#656E67] sm:text-base">
          এই ক্যাটাগরিতে কোনো পণ্য নেই, অথবা ঠিকানাটি সঠিক নয়।
        </p>
        <Link
          href="/"
          className="mt-5 sm:mt-6 w-full sm:w-auto rounded-lg bg-[#05893E] px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-[#047832] sm:text-base"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // সংখ্যামান (number) ধরে সর্ট; মূল অ্যারে অক্ষত রাখতে কপি করা হয়েছে
  const sortedProducts = [...products];
  if (sort === "low") {
    sortedProducts.sort(
      (a: IProduct, b: IProduct) => Number(a.today) - Number(b.today),
    );
  } else if (sort === "high") {
    sortedProducts.sort(
      (a: IProduct, b: IProduct) => Number(b.today) - Number(a.today),
    );
  }

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
      <p className="flex flex-wrap gap-1.5 sm:gap-3 items-center my-3 sm:my-5 text-xs sm:text-sm lg:text-base">
        <Link href="/">হোম</Link>
        <FaAngleRight className="shrink-0 text-xs" />

        <span className="min-w-0 truncate">{products[0]?.categoryNameBn}</span>
      </p>
      <div className="flex items-center gap-2 sm:gap-3 bg-[#FAFCFA] rounded-2xl py-3 sm:py-4 px-3.5 sm:px-6">
        <span className="text-3xl sm:text-4xl lg:text-5xl shrink-0">
          {products[0]?.categoryIcon}
        </span>
        <div className="min-w-0">
          <h2 className="text-base sm:text-xl lg:text-2xl font-bold">{products[0]?.categoryNameBn}</h2>
          <p className="text-xs sm:text-sm lg:text-base">{`${toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}</p>
        </div>
      </div>

      <div className="mt-3 sm:mt-6 flex justify-end bg-[#FAFCFA] rounded-2xl py-2.5 sm:py-4 px-3.5 sm:px-6">
        <SortDropdown current={sort} />
      </div>
      <p className="mt-3 text-xs sm:text-sm lg:text-base text-[#656E67]">{`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-8">
        {sortedProducts.map((product: IProduct) => (
          <Link key={product.id} href={`/itemDetails/${product.id}`} className="block h-full min-w-0">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsDetails;