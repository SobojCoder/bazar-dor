import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IProduct } from "@/Type/product.type";
import { formatPct, formatUnit, getTrend, toBn } from "@/lib/format";

const Marquee = async () => {
  "use cache";

  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data: IProduct[] = await res.json();
  const marqueeData = [...data, ...data];

  return (
    <MarqueeText duration={15} direction="right">
      <div className="flex border-b border-[#d2d2d2] bg-[#FAFCFA] whitespace-nowrap">
        {marqueeData.map((element, index) => {
          const trend = getTrend(element);
          return (
            <Link
              key={`${element.id}-${index}`}
              href={`/product/${element.slug}`}
              className="shrink-0"
            >
              <div className="flex justify-center gap-1 sm:gap-1.5 items-center border-r px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 border-[#d2d2d2]">
                <span className="text-base sm:text-lg lg:text-xl">{element.categoryIcon}</span>
                <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                  {element.nameBn}
                </p>
                <p className="ml-1 text-xs sm:text-sm lg:text-base">
                  {toBn(element.today)} টাকা/{formatUnit(element.unit)}
                </p>
                <span
                  className={`text-xs sm:text-sm lg:text-base ${
                    trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}
                >
                  {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"} {formatPct(element)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </MarqueeText>
  );
};

export default Marquee;