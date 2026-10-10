import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  "use cache";

  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();

  // Duplicate the data
  const marqueeData = [...data, ...data];

  return (
    <MarqueeText duration={15} direction="right">
      <div className="flex border-b border-[#d2d2d2] bg-[#FAFCFA] whitespace-nowrap">
        {marqueeData.map((element, index) => {
          return (
            <Link key={`${element.id}-${index}`} href={`/itemDetails/${element.id}`}>
            <div
              
              className="flex justify-center gap-1.5 items-center border-r px-6  py-2 border-[#d2d2d2]"
            >
              <span className="text-xl">{element.categoryIcon}</span>

              <p className="text-lg font-medium text-gray-800">
                {element.nameBn}
              </p>

              <p className="ml-1">{element.today} টাকা/কেজি</p>

              <div className=" flex items-center gap-1">
                {element.change.pct < 0 ? (
                  <span className="text-red-500">
                    ▼ {Math.abs(element.change.pct)}%
                  </span>
                ) : (
                  <span className="text-green-500">
                    ▲ {Math.abs(element.change.pct)}%
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
