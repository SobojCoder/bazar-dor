"use client";
import Image from "next/image";
import banner from "@/assets/bazar-hero.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Banner = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      });

      setDate(today);
    };

    updateDate();

    // Check every minute
    const interval = setInterval(updateDate, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-4 sm:mt-6 lg:mt-8 py-4 flex flex-col lg:flex-row gap-5 lg:gap-7 items-center bg-[#FAFCFA] justify-center px-4 sm:px-7 rounded-2xl">
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h4 className="border text-[#219653] bg-[#E2F1E7] font-medium py-1 w-full max-w-60 mx-auto lg:mx-0 text-sm sm:text-base rounded-2xl text-center">
          {date}
        </h4>
        <h2 className="text-2xl sm:text-3xl font-bold my-3 sm:my-4">আজকের বাজারের দাম এক নজরে</h2>
        <p className="text-[#7C837D] text-sm sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Link
  href="#allProduct"
  className="btn inline-block mt-6 sm:mt-8 mb-6 lg:mb-9 py-2 px-7 border-none rounded-xl bg-[#07883F] text-white text-center shadow-[0_7px_8px_rgba(0,100,45,0.4)] transition-all duration-200 hover:bg-[#067936] active:translate-y-1 active:shadow-[0_2px_3px_rgba(0,100,45,0.3)]"
>
  সব পণ্য দেখুন
</Link>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src={banner}
          alt="banner"
          width={500}
          height={500}
          className="w-full max-w-xs sm:max-w-sm lg:max-w-125 h-auto"
        />
      </div>
    </div>
  );
};

export default Banner;