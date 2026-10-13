import ProtectedRoute from "@/components/isUserLogin";
import { IMarket } from "@/Type/market.type";
import { IProduct } from "@/Type/product.type";
import { toBn } from "@/utills/numEngToBn";
import { toBnUnit } from "@/utills/toBnUnits";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

// সংখ্যাকে বাংলায় রূপান্তর: 62.5 → ৬২.৫০ টাকা
const formatTaka = (n: number) =>
  `${n.toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })} টাকা`;

const ItemDetails = async ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  const data = await res.json();
  const item: IProduct | undefined = data.find(
    (i: IProduct) => String(i.id) === String(itemId),
  );

  // পণ্য না পেলে আগেই ৪০৪
  if (!item) notFound();

  const markets: IMarket[] = item.markets ?? [];

  // min/max: প্রাথমিক মান সহ, মূল অবজেক্ট না বদলিয়ে
  const result = markets.length
    ? markets.reduce(
        (acc, market) => ({
          min: Math.min(acc.min, market.min),
          max: Math.max(acc.max, market.max),
        }),
        { min: Infinity, max: -Infinity },
      )
    : { min: 0, max: 0 };

  // গড়: সব বাজারের গড় দামের গড়
  const avg = markets.length
    ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
    : 0;

  const pct = item.change?.pct ?? 0;
  const diff = item.today - item.yesterday;

  const emoji = item.image ?? item.categoryIcon;

  return (
    <ProtectedRoute>
    <div className="w-full pb-6 sm:pb-8">
      <p className="flex flex-wrap gap-1.5 sm:gap-3 items-center mt-3 sm:mt-5 text-xs sm:text-sm lg:text-base">
        <Link href="/">হোম</Link>
        <FaAngleRight className="shrink-0 text-xs" />
        <Link href={`/productsDetails/${item.category}`}>
          {item.categoryNameBn}
        </Link>
        <FaAngleRight className="shrink-0 text-xs" />
        <span className="min-w-0 truncate">{item.nameBn}</span>
      </p>

      {/* top section */}
      <div className="flex flex-col sm:flex-row justify-between gap-3.5 sm:gap-4 my-3 sm:my-6 sm:items-center bg-white py-3.5 sm:py-6 px-3.5 sm:px-6 rounded-2xl">
        <div className="flex gap-3 sm:gap-4 min-w-0">
          <span className="shrink-0 self-start text-xl sm:text-3xl lg:text-4xl py-2.5 px-2.5 sm:py-4 sm:px-4 bg-[#F0F5F0] rounded-2xl">
            {emoji}
          </span>

          <div className="min-w-0 text-xs sm:text-sm lg:text-base">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold">{item.nameBn}</h2>

            {/* Subtitle */}
            <p className="mt-1 text-[#5C655E]">{`প্রতি ${toBnUnit(item.unit)} · ${item.categoryNameBn}`}</p>

            {/* Category tags */}
            

            {/* বাড়া/কমার লেখা: আজকের দাম - গতকালের দাম */}
            <p className="mt-2">
              {diff > 0 ? (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">বেড়েছে</span> ·{" "}
                  <span>{toBn(diff)}</span> টাকা
                </>
              ) : diff < 0 ? (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">কমেছে</span> ·{" "}
                  <span>{toBn(Math.abs(diff))}</span> টাকা
                </>
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className="font-bold">অপরিবর্তিত</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto sm:min-w-40 shrink-0 text-center bg-[#F0F5F0] py-2 px-4 rounded-2xl">
          <p className="text-xs sm:text-sm text-[#5C655E]">আজকের দাম</p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">{toBn(item.today)}</h2>
          <p className="text-xs sm:text-sm pb-2 text-[#5C655E]">টাকা / {toBnUnit(item.unit)}</p>{" "}

          {/* ব্যাজ: কমলে লাল ▼, বাড়লে সবুজ ▲ */}
          {pct === 0 ? (
            <span className="inline-block text-xs sm:text-sm text-gray-500 bg-white rounded-3xl px-3 sm:px-4 py-1">
              — ০.০%
            </span>
          ) : pct < 0 ? (
            <span className="inline-block text-xs sm:text-sm text-red-500 bg-white rounded-3xl px-3 sm:px-4 py-1">
              ▼ {toBn(Math.abs(pct))}%
            </span>
          ) : (
            <span className="inline-block text-xs sm:text-sm text-green-500 bg-white rounded-3xl px-3 sm:px-4 py-1">
              ▲ {toBn(Math.abs(pct))}%
            </span>
          )}
        </div>
      </div>

      <div className="bg-white p-3.5 sm:p-6 rounded-2xl">
        <div>
          <h2 className="font-bold text-base sm:text-lg lg:text-xl">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 px-0 sm:px-2 lg:px-7">
            <div className="border border-gray-200 p-3.5 sm:p-4 my-1 sm:my-4 rounded-2xl">
              <p className="text-xs sm:text-sm">সর্বনিম্ন দাম</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1A9951]">{formatTaka(result.min)}</h2>
              <p className="text-xs sm:text-sm">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="border border-gray-200 p-3.5 sm:p-4 my-1 sm:my-4 rounded-2xl">
              <p className="text-xs sm:text-sm">সর্বাধিক দাম</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#D03739]">{formatTaka(result.max)}</h2>
              <p className="text-xs sm:text-sm">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="border border-gray-200 p-3.5 sm:p-4 my-1 sm:my-4 rounded-2xl">
              <p className="text-xs sm:text-sm">গড় দাম</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1A9951]">{formatTaka(avg)}</h2>
              <p className="text-xs sm:text-sm">{`প্রতি ${toBnUnit(item.unit)}-এর হিসাবে`}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-4 sm:mt-6 mb-3 sm:mb-4 font-bold text-base sm:text-lg lg:text-xl">বাজারভিত্তিক আজকের দাম</h2>

        {/* বাইরের রাউন্ড বর্ডার বক্স */}
        <div className="max-w-full overflow-x-auto rounded-xl border  border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] sm:min-w-[600px] whitespace-nowrap text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-normal">বাজার</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left font-normal">বিভাগ</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-normal">সর্বনিম্ন</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-normal">সর্বোচ্চ</th>
                <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market: IMarket, ind: number) => (
                <tr
                  key={ind}
                  className="border-b border-gray-300 last:border-b-0 odd:bg-white even:bg-emerald-50/60"
                >
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-gray-900">
                    {market.market}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-gray-600">{market.division}</td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-gray-700">
                    {formatTaka(market.min)}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right text-gray-700">
                    {formatTaka(market.max)}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-right font-bold text-gray-900">
                    {formatTaka((market.min + market.max) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default ItemDetails;   