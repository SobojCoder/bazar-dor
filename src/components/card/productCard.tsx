import { IProduct } from "@/Type/product.type";
import { toBn } from "@/utills/numEngToBn";
import { toBnUnit } from "@/utills/toBnUnits";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="h-full">
      <div
        key={product.id}
        className="h-full w-full rounded-2xl border border-[#DCE5DE] bg-[#FAFCFA] p-2.5 sm:p-3.5 lg:p-4"
      >
        {" "}
        {/* Product information */}{" "}
        <div className="flex items-center gap-2 sm:gap-3">
          {" "}
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-lg sm:text-2xl">
            {" "}
            {product.image}{" "}
          </div>{" "}
          <div className="min-w-0">
            {" "}
            <h3 className="text-sm sm:text-base font-bold text-[#26332A] truncate">
              {" "}
              {product.nameBn}{" "}
            </h3>{" "}
            <p className="text-[11px] sm:text-xs text-gray-500 truncate">প্রতি {toBnUnit(product.unit)}</p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Price and percentage */}{" "}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-end justify-between gap-x-2 gap-y-1.5">
          {" "}
          <div className="min-w-0">
            {" "}
            <p className="text-[11px] sm:text-xs text-gray-500"> আজকের দাম </p>{" "}
            <p className="text-sm sm:text-base lg:text-lg font-bold text-[#26332A]">
              {" "}
             {toBn(product.today)} টাকা{" "}
            </p>{" "}
          </div>{" "}
          {product.change.pct === 0 ? (
            <span className="shrink-0 rounded-3xl bg-[#F0F5F0] px-2 py-0.5 text-[11px] text-gray-500 sm:px-4 sm:py-1 sm:text-sm">
              — ০.০%
            </span>
          ) : product.change.pct < 0 ? (
            <span className="shrink-0 rounded-3xl bg-[#F0F5F0] px-2 py-0.5 text-[11px] text-red-500 sm:px-4 sm:py-1 sm:text-sm">
              {" "}
              ▼ {toBn(Math.abs(product.change.pct))}%{" "}
            </span>
          ) : (
            <span className="shrink-0 rounded-3xl bg-[#F0F5F0] px-2 py-0.5 text-[11px] text-green-500 sm:px-4 sm:py-1 sm:text-sm">
              {" "}
              ▲ {toBn(Math.abs(product.change.pct))}%{" "}
            </span>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default ProductCard;