
import { IProduct } from "@/Type/product.type";
import ProductCard from "../card/productCard";
import Link from "next/link";
const TodayIncreaseProducts = async () => {
  "use cache";
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();
  const Products = data.filter(
    (product: IProduct) => product.change.pct > 0,
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold my-4"><span className="text-2xl text-green-500">▼</span> আজ দাম কমেছে</h2>
      <div className="grid grid-cols-3 gap-5">
        {Products.map((product: IProduct) => {
          return <div key={product.id}>
            <Link href={`/itemDetails/${product.id}`}>
            
            <ProductCard key={product.id} product={product} />
            </Link>
          </div>
        }
        )}
      </div>
    </div>
  );
};

export default TodayIncreaseProducts;
