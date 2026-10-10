import { IMarket } from "@/Type/market.type";
import { IProduct } from "@/Type/product.type";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
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
  const item = data.find((i: IProduct) => String(i.id) === String(itemId));

  const result = item.markets.reduce(
    (acc: { min: number; max: number }, item: IMarket) => {
      acc.min = Math.min(acc.min, item.min);
      acc.max = Math.max(acc.max, item.max);
      // acc.total = (item.min + item.max) / 2;

      return acc;
    },
  );

  const avg = (result.min + result.max) / 2;

  console.log("Minimum:", result.min); // 140
  console.log("Maximum:", result.max); // 170
  console.log("Average:", avg); // 155.17

  if (!item) notFound();

  return (
    <div>
      <p className="flex gap-3 items-center mt-5"><Link href='/'>হোম</Link><FaAngleRight /><Link href={`/productsDetails/${item.category}`}>{item.categoryNameBn}</Link><FaAngleRight /><span>{item.nameBn}</span></p>
      {/* top section */}
      <div className="flex justify-between gap-4 my-6 items-center bg-white py-6 px-6 rounded-2xl">
        <div className="flex gap-4">
          <span className="text-3xl py-4 px-4 bg-[#F0F5F0] rounded-2xl">
            {item.categoryIcon}
          </span>

          <div>
            <h2 className="text-2xl font-bold">{item.nameBn}</h2>
            <p className="text-[#5C655E]">{`প্রতি কেজি · ${item.categoryNameBn}`}</p>
            {item.yesterday - item.today >= 0 ? (
              <p>
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold">বেড়েছে</span> ·{" "}
                <span>{item.yesterday - item.today}</span> টাকা
              </p>
            ) : (
              <p>
                গতকালের তুলনায় আজ দাম <span className="font-bold">কমেছে</span>{" "}
                · <span>{item.today - item.yesterday}</span> টাকা
              </p>
            )}
          </div>
        </div>
        <div className="text-center bg-[#F0F5F0]  py-2 px-4 rounded-2xl">
          <p className="text-sm text-[#5C655E]">আজকের দাম</p>
          <h2 className="text-2xl font-bold">{item.today}</h2>
          <p className="text-sm pb-2 text-[#5C655E]">টাকা / কেজি</p>{" "}
          {item.change.pct < 0 ? (
            <span className="text-red-500 bg-[#F0F5F0] rounded-3xl px-4 py-1">
              {" "}
              ▲ {Math.abs(item.change.pct)}%{" "}
            </span>
          ) : (
            <span className="text-green-500 bg-[#F0F5F0] rounded-3xl px-4 py-1">
              {" "}
              ▼ {Math.abs(item.change.pct)}%{" "}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl">
        <div>
          <h2 className="font-bold text-xl">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-3 gap-4 px-7">
            <div className="border border-gray-200 p-4 my-4 rounded-2xl">
              <p className="text-sm ">সর্বনিম্ন দাম</p>
              <h2 className="text-2xl font-bold text-[#1A9951]">{`${result.min} টাকা`}</h2>
              <p className="text-sm ">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="border border-gray-200 p-4 my-4  rounded-2xl">
              <p className="text-sm ">সর্বাধিক দাম</p>
              <h2 className="text-2xl font-bold text-[#D03739]">{`${result.max} টাকা`}</h2>
              <p className="text-sm ">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="border border-gray-200 p-4 my-4 rounded-2xl">
              <p className="text-sm ">গড় দাম</p>
              <h2 className="text-2xl font-bold text-[#1A9951]">{`${avg} টাকা`}</h2>
              <p className="text-sm ">প্রতি কেজি-এর হিসাবে</p>
            </div>
          </div>
        </div>
        <h2 className="font-bold text-xl">বাজারভিত্তিক আজকের দাম</h2>
        <h2 className="mb-4 text-xl font-bold">{item.name}</h2>

        {/* বাইরের রাউন্ড বর্ডার বক্স */}
        <div className="overflow-x-auto rounded-xl border  border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="px-4 py-3 text-left font-normal">বাজার</th>
                <th className="px-4 py-3 text-left font-normal">বিভাগ</th>
                <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-normal">সর্বোচ্চ</th>
                <th className="px-4 py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>

            <tbody>
              {item.markets.map((market: IMarket, ind: number) => (
                <tr
                  key={ind}
                  className="border-b border-gray-300 last:border-b-0 odd:bg-white even:bg-emerald-50/60"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {market.market}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{market.division}</td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatTaka(market.min)}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {formatTaka(market.max)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {formatTaka((market.min + market.max) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
