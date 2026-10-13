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
    <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
      <div id="all-product" className="scroll-mt-20">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold my-2">
          সব পণ্য
        </h2>

        <p className="text-xs sm:text-sm lg:text-base text-[#7C837D] mb-3 sm:mb-4">
          {`মোট ${Products.length} টি পণ্য দেখানো হচ্ছে`}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-5">
          {Products.map((product) => (
            <div key={product.id} className="min-w-0 h-full">
              <Link href={`/itemDetails/${product.id}`} className="block h-full">
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;