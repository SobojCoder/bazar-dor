import { toBn } from "@/utills/numEngToBn";
import { toBnUnit } from "@/utills/toBnUnits";
import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {

  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products",
  { next: { revalidate: 3600 } },);
  const data = await res.json();

  // Duplicate the data
  const marqueeData = [...data, ...data];

  return (
    <MarqueeText duration={13} direction="right">
      <div className="flex border-b border-[#d2d2d2] bg-[#FAFCFA] whitespace-nowrap">
        {marqueeData.map((element, index) => {
          return (
            <Link
              key={`${element.id}-${index}`}
              href={`/itemDetails/${element.id}`}
              className="block shrink-0 transition-colors hover:bg-[#F0F5F0]"
            >
              <div className="flex justify-center gap-1 sm:gap-1.5 items-center border-r px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 border-[#d2d2d2]">
                <span className="text-base sm:text-lg lg:text-xl">{element.image  }</span>

                <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                  {element.nameBn}
                </p>

                <p className="ml-1 text-xs sm:text-sm lg:text-base">
                  {toBn(element.today)} টাকা/{toBnUnit(element.unit)}
                </p>

                <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base">
                  {element.change.pct === 0 ? (
                    <span className="shrink-0 rounded-3xl bg-[#F0F5F0] px-2 py-0.5 text-xs text-gray-500 sm:px-3 sm:py-1 sm:text-sm">
                      — ০.০%
                    </span>
                  ) : element.change.pct < 0 ? (
                    <span className="text-red-500">
                      ▼ {toBn(Math.abs(element.change.pct))}%
                    </span>
                  ) : (
                    <span className="text-green-500">
                      ▲ {toBn(Math.abs(element.change.pct))}%
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </MarqueeText>
  );
};

export default Marquee;