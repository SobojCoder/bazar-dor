import Link from "next/link";
import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";

const AllProduct = async () => {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const Products: IProduct[] = await res.json();

  return (
    <section
      id="all-product"
      className="mt-6 sm:mt-8 lg:mt-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20"
    >
      {/* Heading */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold">
          সব পণ্য
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[#7C837D]">
          {`মোট ${Products.length} টি পণ্য দেখানো হচ্ছে`}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6">
        {Products.map((product) => (
          <Link
            key={product.id}
            href={`/itemDetails/${product.id}`}
            className="block h-full min-w-0 rounded-xl transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;