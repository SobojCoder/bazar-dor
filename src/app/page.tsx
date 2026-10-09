import AllProduct from "@/components/homepage/AllProduct";
import Banner from "@/components/homepage/Banner";
import Footer from "@/components/homepage/Footer";
import TodayDescreaseProducts from "@/components/homepage/Today-descrease-product";
import TodayIncreaseProducts from "@/components/homepage/Today-increase-product";

export default function Home() {
  return (
    <div>
      <Banner />
      <TodayDescreaseProducts />
      <TodayIncreaseProducts />
      <AllProduct />
      <Footer />
    </div>
  );
}
