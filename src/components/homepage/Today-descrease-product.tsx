import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";
import { topMovers } from "@/lib/format";

const TodayDecreaseProducts = async () => {
  "use cache";
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data: IProduct[] = await res.json();
  const products = topMovers(data, "down", 6);

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-xl sm:text-2xl font-bold my-3 sm:my-4">
        আজ দাম কমেছে <span className="text-red-500">▼</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TodayDecreaseProducts;