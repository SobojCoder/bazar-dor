import { IProduct } from "@/Type/product.type";
import Link from "next/link";
import React from "react";
import { formatPct, formatTaka, formatUnit, getTrend } from "@/lib/format";

const badge = {
  up: { cls: "text-green-600", icon: "▲" },
  down: { cls: "text-red-500", icon: "▼" },
  flat: { cls: "text-gray-500", icon: "—" },
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const trend = getTrend(product);
  const b = badge[trend];

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-3 sm:p-3.5 transition hover:shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-xl sm:text-2xl">
            {product.categoryIcon}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#26332A] truncate">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500">
              প্রতি {formatUnit(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-gray-500">আজকের দাম</p>
            <p className="text-sm sm:text-base font-bold text-[#26332A]">
              {formatTaka(product.today)}
            </p>
          </div>
          <span
            className={`shrink-0 text-xs sm:text-sm bg-[#F0F5F0] rounded-3xl px-3 sm:px-4 py-1 ${b.cls}`}
          >
            {b.icon} {formatPct(product)}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;