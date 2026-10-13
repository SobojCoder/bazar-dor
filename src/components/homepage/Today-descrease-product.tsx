import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";
import Link from "next/link";

const TodayDescreaseProducts = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products",
  { next: { revalidate: 3600 } },);
  const data = await res.json();
 const Products = data
    .filter((product: IProduct) => (product.change?.pct ?? 0) < 0)
    .sort(
      (a: IProduct, b: IProduct) =>
        (a.change?.pct ?? 0) - (b.change?.pct ?? 0),
    )
    .slice(0, 6);

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
      <h2 className="flex items-center gap-1.5 text-lg sm:text-xl lg:text-2xl font-bold my-3 sm:my-4">
        <span className="text-lg sm:text-xl lg:text-2xl text-red-500">▼</span> আজ দাম কমেছে
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-5">
        {Products.map((product: IProduct) => {
          return <div key={product.id} className="min-w-0 h-full">
            <Link href={`/itemDetails/${product.id}`} className="block h-full">
          
          <ProductCard product={product} />
        </Link>
          </div>
        })}
      </div>
    </div>
  );
};

export default TodayDescreaseProducts;