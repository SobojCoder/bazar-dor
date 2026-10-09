import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";

const TodayDescreaseProducts = async () => {
  "use cache";
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data = await res.json();
  const Products = data.filter(
    (product: IProduct) => (product.change?.pct ?? 0) < 0
);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold my-4"><span className="text-2xl text-red-500">▲</span> আজ দাম বেড়েছে</h2>
      <div className="grid grid-cols-3 gap-5">
        {Products.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TodayDescreaseProducts;
