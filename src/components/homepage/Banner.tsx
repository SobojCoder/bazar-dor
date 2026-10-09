"use client";
import Image from "next/image";
import banner from "@/assets/bazar-hero.png";
import React, { useEffect, useState } from "react";

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
    <div className="mt-8  py-4 flex gap-7 items-center bg-[#FAFCFA] justify-center px-7 rounded-2xl">
      <div>
        <h4 className="border text-[#219653] bg-[#E2F1E7] font-medium py-1 w-60 rounded-2xl text-center">
          {date}
        </h4>
        <h2 className="text-3xl font-bold my-4">আজকের বাজারের দাম এক নজরে</h2>
        <p className="text-[#7C837D]">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <button className="btn mt-8 mb-9 py-2 px-7 border-none rounded-xl bg-[#07883F] text-white shadow-[0_7px_8px_rgba(0,100,45,0.4)] transition-all duration-200 hover:bg-[#067936] active:translate-y-1 active:shadow-[0_2px_3px_rgba(0,100,45,0.3)]">
          {" "}
          সব পণ্য দেখুন{" "}
        </button>
      </div>
      <div>
        <Image src={banner} alt="banner" width={500} height={500} />
      </div>
    </div>
  );
};

export default Banner;
