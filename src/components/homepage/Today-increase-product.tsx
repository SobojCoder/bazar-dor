
import { IProduct } from "@/Type/product.type";
import DescreaseProductCard from "../card/productCard";
const TodayIncreaseProducts = async () => {
  "use cache";
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const data = await res.json();
  const Products = data.filter(
    (product: IProduct) => product.change.pct > 0,
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold my-4"><span className="text-2xl text-green-500">▼</span> আজ দাম কমেছে</h2>
      <div className="grid grid-cols-3 gap-5">
        {Products.map((product: IProduct) => (
          <DescreaseProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TodayIncreaseProducts;
